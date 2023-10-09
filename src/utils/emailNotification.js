export const sendEmailNotification = async (email, message) => {
  try {
    await fetch(
      "https://us-central1-book-lending-platform.cloudfunctions.net/sendEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
        mode: "cors",
      }
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
