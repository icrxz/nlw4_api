import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount()
      .then(({ smtp, user, pass }) => {
        const transporter = nodemailer.createTransport({
          host: smtp.host,
          port: smtp.port,
          secure: smtp.secure,
          auth: {
            user,
            pass
          }
        });

        this.client = transporter;
      });
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreplay@nps.com.br>"
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default new SendMailService();
