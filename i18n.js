const dateTimeFormatter = (locale, value) => {
  let formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });
  return formatter.format(value);
}

const numberFormatter = (locale, value, currency) => {
  let formatter = new Intl.NumberFormat(locale, !!currency && {
    style: "currency",
    currency: currency
  });
  return formatter.format(value);
}

const pluralFormatter = (locale, key, number) => {
  let formatter = new Intl.PluralRules(locale);
  const formatOrdinals = (n) => {
    const rule = formatter.select(n);
    const suffix = key[rule];
    return `${n}${suffix}`;
  };
  return formatOrdinals(number);
}

const listFormatter = (locale, args) => {
  return new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction"
  }).format(args);
}

const timeFormatter = (locale, value, unit) => {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    localeMatcher: "best fit",
    numeric: "always",
    style: "long",
  });
  return rtf.format(value, unit);
}

module.exports = function getI18nText({ stringTokens, variables, translations, locale }) {  
 
  let i18nText = [];

  let res = stringTokens.map( (item) => {
    switch( item[0] ) {      
      case '#':
        i18nText.push(translations[locale][item.slice(1)]);
        break;
      
      case '@date':
        value = item[1][0] === '$' ? variables[item[1].slice(1)] : item[1];
        console.log(value);
        i18nText.push(dateTimeFormatter(locale, value));
        break;
      
      case '@number':
        value = item[1][0] === '$' ? variables[item[1].slice(1)] : item[1];
        currency = item[2]
        i18nText.push(numberFormatter(locale, value, currency));
        break;

      case '@plural':
        key = translations[locale][item[1].slice(1)]
        number = item[2][0] === '$' ? variables[item[2].slice(1)] : item[2];
        i18nText.push(pluralFormatter(locale, key, number));
        break;

      case '@list':
        args = item.slice(1, item.lenght);
        newArgs = args.map( (item) => {
          switch(item[0]) {
            case '#':
              return translations[locale][item.slice(1)];
            case '$':
              return variables[item.slice(1)];
            default:
              return item
          }
        })
        i18nText.push(listFormatter(locale, newArgs));
        break;

      case '@relativeTime':
        value = item[1][0] === '$' ? variables[item[1].slice(1)] : item[1];
        unit = item[2];
        i18nText.push(timeFormatter(locale, value, unit));
        break;

      default:
        typeof item === `string` ? i18nText.push(item) : '';
    }
  });

 return i18nText.join('');
}