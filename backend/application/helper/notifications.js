const { notifications } = require('../models');
const fcm = require('fcm-notification'),
        abc = {
            "type": "service_account",
            "project_id": "siyamed-d5c76",
            "private_key_id": "3f03a5292e2cb74d3a67c51e6275738930d716ea",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDORQtIGFCoYjuR\n+FQJsdhE2kJyAhdULRfmM4pc6ifDeyzArIXUGue4Wze0S6Hi7MGg0AetsZXbhEob\nIXJrbrIcdwpKzdxJlsRmZv14EO3TuHwihjNuk93mZZl9St3NJ4yzr4XYkY+7SAr1\nGHeBtSy2MEg7e5YiWSB5wQFzsT/Dr08l6H8HKXG5t+C78WfIngZJq8MdPwO5UUSW\nMsbqxBakOxFuRSQvWyQ+6o9Vodq1JdR9dZ1wvaO6yANrngFc3+2+878nA8eooe2F\nRloaSz7OmDgZD+YFGCTL1jWEoNX+lcXg5LZJd2bUhNdONRhc1qgqHQ6S3w+pRFw5\nuqoczyGHAgMBAAECggEAUOYMbCy5KalJUtEx6JF7UFnH2J4QVz/OUUdim1ls2gLL\nxQ+E93DL8+a2vLwzFGSl9nPQpyNwsmU6iVR/YzpJmddoTnlZzfTXN5BqFfaRyElh\nSksXDeXpkEzFu7mqryU1Tl3nYU6JsDqrrX/4kwMjM5tRIR8x/Wu2THpRnvXkG9NH\nmF0YFWwqAm09riDMYkvP9AQ+jrI0TBG1EPr2rYxueb9LTfGdeAPYYrfkilSXiJjR\nr8PpU7BmUjNnSt5/9NAK1WNaZEDeXNA1k4fGHf+Ovry3L6wM9lFHrf2zf9OUo16X\nz7zJGa9hKzDNjONTrnbb2em8T4nw7AC+7Lmjua28TQKBgQD5sCvfYz+YEpsjFH8w\nuZ9ejzwUWci/OirhcnbTY1X4AU2UXPYsrfpBeidyuorJycGwSIhJrzvvGkDWvx8W\n+2fjjfCnWh3HvcXRFpFI78NZHzCvno85hbRHcaq9Y9egReMpttyGzEc+iKfxXMe4\nFay6nRa1DG1aMBaHxt0X4MnRWwKBgQDTe+UgGIUCMqzuivENWet8Nf6nZh3j0yUz\nYXv2oaDN9LHE/AZ7EnlEqstbF0liTv1vEDHQecOy27OYUN5IH6UhjDdrKtI0HA4h\nQ/i42HIq6Y9IfkuAoFWgk0KbFiIcXAj2ze7wbyo+Jvt2VRh0J5sgisDMdS+53bxd\nRVQ3kBdcRQKBgEeYZHwhkVKhwypD7lSiZThQCgIr3Iw4uaL7l2b1zOjYNs6b+VrG\naEPuKvGS28kQuSE7Kxk1zhG5jW4GT3vfiuKNCLxz8qYbnGVf+zjWx0T+1I8HADqW\nRCNYTIUR4/ppD8IeVQ2x9ZvQw5dJ61q1nFnGQYSYk6KQt2UneK4oHraRAoGBALsT\nTNLAfeA83ZbCF4vc8B9XUCXagjRHUhAKevLndOzbOOnsmvsBk353qx2wEr1A7JTz\neW1WWRP9nvftCUQ5ogR0GY3WOk3YR3OLwhgZd5yYMKRK/BUTP8ukmHXB9XiqvU89\nSdEsNOz35Nd/XPtbEbGOrA/w1cAP8pF7Q41HDDMVAoGBANOVjOuzMC7u1cNKuc3a\nkEw2fZQbpAaiIz+zOMHfdsPlbrpNAb2gNg7a/dUz176gVkGR9Rgkx65dBaoYa1xE\nbAoqjOKgX8Ccck33/3x4TR9ia9s3/s9aLmnfNJTKhfOcsI/WcZtJfg+SfbP10pqa\nMBBt1FZmYsFYHtF5ux+D4f2v\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-hc9yy@siyamed-d5c76.iam.gserviceaccount.com",
            "client_id": "107272910464110226714",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hc9yy%40siyamed-d5c76.iam.gserviceaccount.com"
          };
        FCM = new fcm(abc)
        module.exports = {
            /**
             * 
             * @param {
             *      title,
             *      body,
             *      type,
             *      device_token,
             *      device_type
             * } data 
             */
                async sendnotification (data) {
                    if(data.device_type == 'ANDROID'){
                        var notification_data = {
        
                            notification:{
                                    title:data.title,
                                    body: data.body
                                },
            
                            data: {
                                type : data.type,
                                title : data.title,
                                body : data.body
                            },
                            token: data.device_token
                        };
                    }else{
                        var notification_data = {
                            notification:{
                                title: data.title,
                                body: data.body
                            },
                            data :{
                                title: data.title,
                                body: data.body
                            },
                            token : data.device_token
                        }
                    }
                    
                    
                    FCM.send(notification_data, async function(err, response) {
                        if(err){
                            console.log('error found', err);
                            return false;
                        } else {
                            return true;
                        }
                    });
                    
                }
        }