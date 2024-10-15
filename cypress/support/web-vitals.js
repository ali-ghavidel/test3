import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals';

// A function to log Web Vitals data
function sendToAnalytics(metric) {
  console.log(metric); // Replace this with a way to log or report metrics
  cy.log(metric)
  // For example: Send the metrics to an external service or save them in a file
}

// Initialize Web Vitals tracking
export const registerWebVitals = () => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};
