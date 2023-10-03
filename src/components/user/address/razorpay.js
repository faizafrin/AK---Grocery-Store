const razorpay = () => {
    var options = {
      key: "rzp_test_kgUEwHuOQmpNz6",
      key_secret: "UFEaoGwrbwHdSxQ0ph2J9TwU",
      amount: parseInt("100") * 100,
      currency: "INR",
      name: "Glosary store",
      description: "for testing purpose",
      handler: function (response) {
        return response
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();

  }

  export default razorpay;