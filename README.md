# demo-app-inventario

##############################################################################################
Workshop desarrollo de una aplicación móvil con Ionic 3
##############################################################################################

Introducción a la programación de aplicaciones móviles híbridas con el framework Ionic 3.

El presente taller tiene como propósito entregar conceptos iniciales en el desarrollo de aplicaciones móviles híbridas a través del framework ionic en su versión 3. Al final del taller el participante podrá construir su propia aplicación móvil para Android o iOS con las funcionalidades básicas. Además aprenderá a utilizar otras herramientas que son muy importantes en el desarrollo de software.

Los objetivos son:

Conocer el concepto de aplicación móvil híbrida.
Identificar el framework para desarrollo movil Ionic 3.
Conocer las herramientas y servicios para el desarrollo móvil de Ionic 3.
Conocer los servicios REST.
Conocer el formato JSON para intercambio de datos.
Crear una aplicación móvil con el framework Ionic 3.
Publicar una App en Google Play y App Store.
Valorar el potencial creativo y profesional de la programación de Apps con Ionic 3.

Preparación del entorno:

Se utilizara sistema operativo windows 10

Instalar node.js (6.10.1), npm (1.10.10), android-sdk (mínimo api 19) o android studio, Java Development Kit (JDK)(mínimo versión  8), Gradle, Ionic 3 (versión 3.19.0) y cordova(7.1.0). Finalmente, Git y Visual Studio Code u otro editor.

No olvidar configurar las variables de entorno para android, jdk y gradle.


Descripción del módulo:

Parte 1: 

a) Introducción a la programación de Apps Híbridas con Ionic 3, visión general.

Parte 2: 

a) Identificar el framework Ionic 3 y sus componentes.
b) Elementos del framework Ionic 3.
d) Comandos básicos de Ionic 3.

Parte 3:

a) Crear una un servicio rest para ser consumido por la App.

Parte 4:

a) Crear la una app con Ionic 3.
b) Incluir las librerías requeridas.
c) Poner los scripts que permiten funcionalidad.
d) Instalar y configurar los plugins que requiera la App.

Parte 5:

a) Compilar y ejecutar la App en un emulador y en un smartphone.
b) Utilizar Google Chrome para emular la App y depurar.
c) Utilizar Device con Android para probar la App.
d) Generar el Keystore y Firmar la App.
e) Subir la App a Google Play.
f) Distribuir nuestra App a beta testers. 

Parte 6:

a) Compilar y ejecutar la App para iOS.
b) Utilizar safari y el emulador de iOS para depurar.
c) Utilizar Device con iOS para probar la App.
d) Generar el certificado iOS para publicarla en Apple Store.
f) Distribuir nuestra App a beta testers.

Parte 7: Evaluación:

a) Publicación de la App en la Store determinada.

##############################################################################################

Actividad

##############################################################################################

Construya su aplicación siguiendo el procedimiento que hay a continuación:

1. Crear la App

ionic start demo-app-inventario blank

2. Ejecutar

ionic serve --lab

3. Agregar plugins

ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
ionic cordova plugin add cordova-plugin-x-toast
npm install --save @ionic-native/toast


4. Configurar el plugin Barcode y Toast en 'src/app/app.module.ts'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

Luego, agregar 'BarcodeScanner' y 'Toast' a '@NgModule' providers

providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  BarcodeScanner,
  Toast
]

5. Implementar el data-service

ionic g provider DataService

6. Luego, editarlo en 'src/providers/data-service/data-service.ts'

agregar la función después del constructor:


getProducts(): Observable<string[]> {
  return this.http.get(this.apiUrl).pipe(
    map(this.extractData),
    catchError(this.handleError)
  );
}

7. Y no olvidar agregar

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

8. Luego en 'src/app/app.module.ts', agregar

import { HttpClientModule } from '@angular/common/http';

Y en @NgModule

imports: [
  BrowserModule,
  HttpClientModule,
  IonicModule.forRoot(MyApp)
],


9. En home, editar 'src/pages/home/home.ts', agregar

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';

10. Y agrégelos al constructor

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.inventario = response
            console.log(this.inventario);
        });
  }


11. Además, declare las variables

inventario: any[] = [];
selectedProduct: any;
productFound:boolean = false;


12. Note que se agregó esta función para traer los datos del JSON dentro del constructor

      this.dataService.getProducts()
        .subscribe((response)=> {
            this.inventario = response
            console.log(this.inventario);
        });


13. Cree una nueva función para escanear el código

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.inventario.find(product => product.codigo === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Recurso no encontrado en inventario', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

14. Ahora edite 'src/pages/home/home.html' y agregue

//<p>
    Cuando encuentre un producto, presione "Escanear", apunte la cámara hacia el código de barras, fíjela en el centro, Y espere que la aplicación busque el recurso. Luego continue.
 //</p>

15. Ahora pruebe su aplicación. 

Descargue en su teléfono Ionic DevApp de las Store

Asegúrese de estar en la misma red WiFi que su equipo.

Escriba el comando: ionic serve -c

16. Puede agregar la plataforma para Android o iOS

ionic cordova platform add Android

ionic cordova platform add iOS (Si está en un MAC)

17. Y correr la App con el emulador

ionic cordova run android

o

ionic cordova run android --device, si tiene su teléfono cnectado por usb al PC

