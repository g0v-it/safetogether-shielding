
const sgMail = require('@sendgrid/mail');
//Todo da spostare su env
sgMail.setApiKey('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');

const msg = {
    to: 'mohd.miah@issgreppi.it',
    from: 'mohdehtesham.miah@mail.polimi.it',
    subject: 'Help request from Protezione Civile',
    text: 'Protezione civile assigned a request to you',
    html: `<strong>and easy to do anywhere, even with Node.js</strong>`,
};



module.exports = {
    send: async (to, html) => {
        await sgMail.send({
            ...msg,
            to,
            html
        })
    }
}