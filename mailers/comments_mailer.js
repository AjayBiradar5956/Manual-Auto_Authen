const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    // console.log("inside newComment mailer", comment);
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'aj813825@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString,
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err);
            return;
        }
        console.log(info);
        return;
    })
}