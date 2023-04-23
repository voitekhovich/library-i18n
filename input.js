const getI18nText = require("./i18n.js");

const stringTokens = [
  "#price",
  " ",  
  ["@plural", "#day", "$tripDays"],  
  " - ",  
  ["@number", "$tripPrice", "USD"]
];  

const variables = {  
tripDays: 10,  
tripPrice: 56789.01,  
}  

const translations = {  
"ru-RU" : {             // локаль  
  price: "Цена",        // обычный перевод для ключа price  
  day: {                // перевод для ключа day c учетом плюральных форм  
      zero: " дней",  
      one: " день",  
      few: " дня",  
      many: " дней",  
      other: " дней",  
  }  
},  
"en-US": {  
    price: "Price",  
    day: {  
        one: " day",  
        other: " days",  
      }  
},  
}  

console.log(getI18nText({stringTokens, variables, translations, locale: "ru-RU"})) //  "Цена 10 дней - 56 789,01 $"  
console.log(getI18nText({stringTokens, variables, translations, locale: "en-US"})) //  "Price 10 days - $56,789.01"

console.log(getI18nText({  
  stringTokens: [["@date", '$tripDays']],  
  locale: "ru-RU",  
  variables: { tripDays: 1676561884561 },  
})) // четверг, 16 февраля 2023 г., 15:38:04 UTC

console.log(getI18nText({  
  stringTokens: [["@date", 1676561884561]],  
  locale: "ru-RU",  
})) // четверг, 16 февраля 2023 г., 15:38:04 UTC

console.log(getI18nText({  
  stringTokens: [["@number", 56789.01, "USD"]],  
  locale: "ru-RU",  
})) // 56 789,01 $

console.log(getI18nText({  
  stringTokens: [["@number", 56789.01]],  
  locale: "ru-RU",  
})) // 56 789,01

console.log(getI18nText({  
  stringTokens: [["@plural", "#day", "$tripDays"]],  
  variables: { tripDays: 434.5 },  
  translations: {  
    "ru-RU": {  
      day: {  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
      },  
    }  
    // ...  
  },  
  locale: "ru-RU",  
})) // "434,5 дня"

console.log(
  getI18nText({  
    stringTokens: [["@list", "Motorcycle", "$item", "#bus"]],  
    variables: { item: "Car" },  
    translations: {  
      "en-US": {  
          bus: "Bus",  
      },  
      // ...  
    },  
    locale: "en-US",  
  }) // "Motorcycle, Car, and Bus"
);

console.log(
  getI18nText({  
    stringTokens: [["@relativeTime", -5, "hours"]],  
    locale: "ru-RU",  
  }) // 5 часов назад
);

console.log(
  getI18nText({  
    stringTokens: [["@relativeTime", '$item', "hours"]],  
    locale: "en",
    variables: { item: -5 }, 
  }) // 5 часов назад
);