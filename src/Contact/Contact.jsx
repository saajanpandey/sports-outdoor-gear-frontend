import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUs = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 5 }, background: "#f4f6f8", color: "#000" }}>
      {/* Contact Header */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "black" }}
      >
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" mb={5}>
        Reach out to us anytime — we’re here to help!
      </Typography>

      {/* Contact Form and Map Container */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: "1200px", mx: "auto" }} // Center container with max width
      >
        {/* Added empty Grid item to push form and map a bit right */}
        <Grid item xs={false} md={1} />

        {/* Form */}
        <Grid item xs={12} md={5.5}>
          <Paper
            elevation={4}
            sx={{ p: 3, backgroundColor: "#f6f9fb", color: "black" }}
          >
            <Typography variant="h6" gutterBottom>
              Send us a message
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={{
                  mb: 2,
                  background: "#fff",
                  input: { color: "black" },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={{
                  mb: 2,
                  background: "#fff",
                  input: { color: "black" },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{
                  mb: 2,
                  background: "#fff",
                  input: { color: "black" },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1e88e5",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={4.5}>
          <Paper
            elevation={4}
            sx={{ height: "100%", backgroundColor: "#f6f9fb" }}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5682893793793!2d-79.3839346845011!3d43.65322677912173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d3e6f19717%3A0xcea7303a2b6c0624!2sToronto!5e0!3m2!1sen!2sca!4v1616161616161"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>

      {/* Contact Details */}
      <Box mt={8}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Have any queries?
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={2}>
          {[
            { icon: <PhoneIcon />, label: "Phone", value: "+1 (123) 456-7890" },
            {
              icon: <EmailIcon />,
              label: "Email",
              value: "support@example.com",
            },
            {
              icon: <LocationOnIcon />,
              label: "Address",
              value: "123 Main St, Toronto, ON",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#f6f9fb",
                  color: "black",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e2e8f0",
                    color: "#1e88e5",
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>{item.icon}</Box>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="body2">{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box mt={10}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Frequently Asked Questions
        </Typography>

        {[
          {
            question: "What are your store hours?",
            answer:
              "We’re open Monday to Saturday from 9 AM to 8 PM. We are closed on Sundays and public holidays. During holiday seasons, we may extend working hours.",
          },
          {
            question: "Do you deliver outside of Toronto?",
            answer:
              "Yes! We deliver across Canada and internationally. Delivery fees and times depend on your location. You can see estimates during checkout.",
          },
          {
            question: "How can I track my order?",
            answer:
              "Once your order is shipped, you'll receive an email with tracking details. You can also check order status anytime by logging into your account.",
          },
          {
            question: "What is your return policy?",
            answer:
              "We accept returns within 14 days of delivery. The item must be unused and in original condition. Please include the invoice and original packaging.",
          },
          {
            question: "Do you offer team discounts or bulk orders?",
            answer:
              "Absolutely! We provide bulk pricing for schools, colleges, and sports clubs. Contact our sales team directly for a custom quote.",
          },
          {
            question: "Is there a physical store I can visit?",
            answer:
              "Yes, you can visit our main store at 123 Sports Lane, Toronto. We welcome walk-ins and demo sessions for select sports gear.",
          },
        ].map((faq, i) => (
          <Accordion
            key={i}
            sx={{
              backgroundColor: "#f6f9fb",
              color: "black",
              mb: 1,
              border: "1px solid #e0e0e0",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#e2e8f0",
                color: "#1e88e5",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "inherit" }} />}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default ContactUs;
