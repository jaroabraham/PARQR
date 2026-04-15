#include <WiFi.h>
#include <HTTPClient.h>

// Configuración de WiFi
const char* ssid = "NOMBRE_DE_TU_WIFI";
const char* password = "TU_CONTRASEÑA";

// Configuración del servidor (IP o Dominio de tu servidor Dockerizado)
const char* serverUrl = "http://TU_IP_O_DOMINIO/api/gate/status";

// Pin conectado al Relé que acciona la pluma
const int RELAY_PIN = 4;

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Pluma cerrada por defecto

  // Conectar a WiFi
  Serial.print("Conectando a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado.");
  Serial.println("IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Iniciar conexión
    http.begin(serverUrl);
    int httpResponseCode = http.GET();
    
    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("Respuesta del servidor: " + payload);
      
      // Analizar JSON de forma simple (para evitar dependencias grandes)
      // Buscamos si "open":true está en la respuesta
      if (payload.indexOf("\"open\":true") > 0 || payload.indexOf("\"open\": true") > 0) {
        Serial.println(">>> SEÑAL DE APERTURA RECIBIDA <<<");
        abrirPluma();
      } else {
        Serial.println("Pluma cerrada.");
        digitalWrite(RELAY_PIN, LOW);
      }
    } else {
      Serial.print("Error en petición HTTP: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  } else {
    Serial.println("Error en conexión WiFi");
  }
  
  // Consultar cada 1 segundo (ajustable)
  delay(1000);
}

void abrirPluma() {
  // Activa el relé por 2 segundos p.ej para simular el pulso del botón
  digitalWrite(RELAY_PIN, HIGH);
  delay(2000); 
  digitalWrite(RELAY_PIN, LOW);
  
  // Esperar un tiempo prudente antes de volver a consultar
  // para no atascar la pluma abriendo repetidamente
  delay(5000); 
}
