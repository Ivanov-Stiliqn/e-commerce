import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const serviceId = 'gmail';
const templateId = 'template_saP5lbUD';
const userId = 'user_2lXQgYx3hPunCXiOT2IIf';
const adminEmail = 'stiliyanIvanov@icloud.com';
const emailProvider = 'https://api.emailjs.com/api/v1.0/email/send';

@Injectable()
export class MailService {
  constructor(private http: HttpClient){}

  sendEmail(username: string, email: string, phone: string) {
    let products = JSON.parse(localStorage.getItem('cart'));

    let total = 0;
    let text = `<h2>User ${username} with email: ${email} and phone ${phone} just made order:</h2>`;
    for (let product of products) {
      total += product.quantity * product.price;
      text += `<p>${product.name}: ${product.quantity} * ${product.price}$</p>`;
    }

    text += `<h3>Total: ${total}$</h3>`;

    let data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        message_html: text,
        to_email: adminEmail
      },
    };

    return this.http.post(emailProvider, data);
  }
}
