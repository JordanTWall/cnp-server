const express = require('express')
const router = express.Router()

function generateQuoteHTML(
  serviceData,
  taxes,
  savings,
  total,
  discountCodeInput
) {
  // Money
  const preTaxTotal = (total - savings).toFixed(2)
  const taxesFormatted = taxes.toFixed(2)
  const savingsFormatted = savings.toFixed(2)
  const totalFormatted = total.toFixed(2)

  let html = '<ul style="list-style-type:none">'

  // Only add service to email if quantity selected.
  Object.entries(serviceData).forEach(
    ([serviceName, { quantity, serviceSubtotal }]) => {
      if (quantity > 0) {
        html += `<li>${serviceName} (x${quantity}): $${serviceSubtotal.toFixed(
          2
        )}</li>`
      }
    }
  )

  html += `<li style="margin-top: 20px">Subtotal: $${preTaxTotal}</li>`
  html += `<li>Taxes: $${taxesFormatted}</li>`
  html += `<li>Savings: $${savingsFormatted}</li>`

  if (discountCodeInput && discountCodeInput.length > 0) {
    html += `<li>Discount Code: ${discountCodeInput}</li>`
  }

  html += `<li><b>Total: <span style="color: green;">$${totalFormatted}</span></b></li>`
  html += '</ul>'

  return html
}

module.exports = generateQuoteHTML
