 2022-05-08_HSBCStatement_FunTyperLtd_FR014_£1560.pdf
 2022-06-08_HSBCStatement_FunTyperLtd_FR015_£1440.pdf
 2022-07-08_HSBCStatement_FunTyperLtd_FR016_£1440.pdf
 2022-08-08_HSBCStatement_FunTyperLtd_FR017_£1440.pdf
'2022-09-06-Invoice_Novastratech_Monitor_dollar90.00=£78.28.jpg'
 2022-09-08_HSBCStatement_FunTyperLtd_FR018_£1440.pdf
 2022-10-08_HSBCStatement_FunTyperLtd_FR019_£1440.pdf
'2022-10-11_Invoice_KSEU694887_euro68.36=£60.26.pdf'
 2022-11-08_HSBCStatement_FunTyperLtd_FR020_£1440_Kimsufi_KSEU694887_£60.26.pdf
'2022-11-30_Invoice_JuanMarcet_Logitech_$82.86=£69.39.jpg'
'2022-11-30_Invoice_OnlineFactory_OfficeChair_$100.02=£83.76.jpg'
 2022-12-08_HSBCStatement_FunTyperLtd_FR021_£1440_Logitech_£69.39.pdf
 2022-12-12_Invoice_ThandiAccts_£264.pdf
'2023-01-13_Invoice_KSEU706990_euro25.07=£22.30.pdf'
 2023-02-08_HSBCStatement_FunTyperLtd_FR022_£1440_Kimsufi_KSEU706990_£22.30.pdf
 2023-02-08_HSBCStatement_FunTyperLtd_FR022_FR023_£2880_Kimsufi_KSEU706990_£22.30.pdf
'2023-02-10_Invoice_KSEU710314_euro25.07=£22.38.pdf'
 2023-03-08_HSBCStatement_FunTyperLtd_FR024_£1440_Kimsufi_KSEU710314_£22.38.pdf
'2023-03-10_Invoice_KSEU713435_euro25.07=£22.36.pdf'
 2023-04-08_HSBCStatement_FunTyperLtd_FR025_£1440_Kimsufi_KSEU713435_£22.36.pdf
 Invoice_FuntechLtd_FR014_£1560.pdf
 Invoice_FuntechLtd_FR015_£1440.pdf
 Invoice_FuntechLtd_FR016_£1440.pdf
 Invoice_FuntechLtd_FR017_£1440.pdf
 Invoice_FuntechLtd_FR018_£1440.pdf
 Invoice_FuntechLtd_FR019_£1440.pdf
 Invoice_FuntechLtd_FR020_£1440.pdf
 Invoice_FuntechLtd_FR021_£1440.pdf
 Invoice_FuntechLtd_FR022_£1440.pdf
 Invoice_FuntechLtd_FR023_£1440.pdf
 Invoice_FuntechLtd_FR024_£1440.pdf
 Invoice_FuntechLtd_FR025_£1440.pdf
 OriginalStatements/
 Tim-Bushell-Sole-Trader-Simple-2022-2023.xlsx


 export function convertStringToType(value) {
  value = value || ""

  if (value && !isNaN(Number(value))) {
    return Number(value)
  } else if (value && !isNaN(Date.parse(value))) {
    return new Date(Date.parse(value))
  } else if (
    value.toLowerCase() === "true" ||
    value.toLowerCase() === "false"
  ) {
    return Boolean(value)
  }
  return value // Return the value as-is if no specific conversion is needed
}

export function parseArgs(args, valueSeparator) {
  const parsedArgs = {}
  valueSeparator = valueSeparator || "="
  args = args || []
  for (let arg of args) {
    arg = arg.trim()
    if (!arg.includes(valueSeparator)) {
      if (arg) {
        console.log(`Ignoring invalid arg: ${arg}`)
      }
    } else {
      // Split each arg into its name and value parts
      const [propName, propValue] = arg.split(valueSeparator).map(s => s.trim())
      // Ignore invalid arg formats
      if (!propName || !propValue) {
        console.log(`Ignoring invalid arg: ${arg}`)
      } else if (propName && propName.startsWith("-")) {
        console.log(`Ignoring invalid arg: ${arg}`)
      } else {
        parsedArgs[propName] = convertStringToType(propValue)
      }
    }
  }
  return parsedArgs
}

export default parseArgs
