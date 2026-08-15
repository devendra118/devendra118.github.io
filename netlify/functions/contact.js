exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: {"Content-Type":"application/json"}, body: JSON.stringify({ok:false,message:"Method not allowed"}) };
  }
  try {
    const data = JSON.parse(event.body || "{}");
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !message) {
      return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({ok:false,message:"Please fill all required fields."}) };
    }

    // Configure a transactional email provider later by adding CONTACT_EMAIL
    // and provider credentials in Netlify environment variables.
    console.log("Portfolio contact enquiry:", { name, email, message });

    return {
      statusCode: 200,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        ok: true,
        message: "Thanks! Your message has been received."
      })
    };
  } catch (e) {
    return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({ok:false,message:"Invalid request."}) };
  }
};
