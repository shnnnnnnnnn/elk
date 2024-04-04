const countryLocaleVariants = {
  ar: [
    // ar.json contains ar-EG translations
    // { code: 'ar-DZ', name: 'Arabic (Algeria)' },
    // { code: 'ar-BH', name: 'Arabic (Bahrain)' },
    { country: true, code: "ar-EG", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }
    // { code: 'ar-EG', name: 'Arabic (Egypt)' },
    // { code: 'ar-IQ', name: 'Arabic (Iraq)' },
    // { code: 'ar-JO', name: 'Arabic (Jordan)' },
    // { code: 'ar-KW', name: 'Arabic (Kuwait)' },
    // { code: 'ar-LB', name: 'Arabic (Lebanon)' },
    // { code: 'ar-LY', name: 'Arabic (Libya)' },
    // { code: 'ar-MA', name: 'Arabic (Morocco)' },
    // { code: 'ar-OM', name: 'Arabic (Oman)' },
    // { code: 'ar-QA', name: 'Arabic (Qatar)' },
    // { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
    // { code: 'ar-SY', name: 'Arabic (Syria)' },
    // { code: 'ar-TN', name: 'Arabic (Tunisia)' },
    // { code: 'ar-AE', name: 'Arabic (U.A.E.)' },
    // { code: 'ar-YE', name: 'Arabic (Yemen)' },
  ],
  en: [
    // en.json contains en-US translations
    { country: true, code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" }
  ],
  ca: [
    // ca.json contains ca-ES translations
    // { code: 'ca-AD', name: 'Català (Andorra)' },
    { country: true, code: "ca-ES", name: "Catal\xE0 (Espanya)" },
    { code: "ca-valencia", name: "Catal\xE0 (valenci\xE0)" }
    // { code: 'ca-FR', name: 'Català (França)' },
    // { code: 'ca-IT', name: 'Català (Itàlia)' },
  ],
  es: [
    // es.json contains es-ES translations
    // { code: 'es-AR', name: 'Español (Argentina)' },
    // { code: 'es-BO', name: 'Español (Bolivia)' },
    // { code: 'es-CL', name: 'Español (Chile)' },
    // { code: 'es-CO', name: 'Español (Colombia)' },
    // { code: 'es-CR', name: 'Español (Costa Rica)' },
    // { code: 'es-DO', name: 'Español (República Dominicana)' },
    // { code: 'es-EC', name: 'Español (Ecuador)' },
    { country: true, code: "es-ES", name: "Espa\xF1ol (Espa\xF1a)" },
    // TODO: Support es-419, if we include spanish country variants remove also fix on utils/language.ts module
    { code: "es-419", name: "Espa\xF1ol (Latinoam\xE9rica)" }
    // { code: 'es-GT', name: 'Español (Guatemala)' },
    // { code: 'es-HN', name: 'Español (Honduras)' },
    // { code: 'es-MX', name: 'Español (México)' },
    // { code: 'es-NI', name: 'Español (Nicaragua)' },
    // { code: 'es-PA', name: 'Español (Panamá)' },
    // { code: 'es-PE', name: 'Español (Perú)' },
    // { code: 'es-PR', name: 'Español (Puerto Rico)' },
    // { code: 'es-SV', name: 'Español (El Salvador)' },
    // { code: 'es-US', name: 'Español (Estados Unidos)' },
    // { code: 'es-UY', name: 'Español (Uruguay)' },
    // { code: 'es-VE', name: 'Español (Venezuela)' },
  ],
  pt: [
    // pt.json contains pt-PT translations
    { country: true, code: "pt-PT", name: "Portugu\xEAs (Portugal)" },
    { code: "pt-BR", name: "Portugu\xEAs (Brasil)" }
  ]
};
const locales = [
  {
    code: "en",
    file: "en.json",
    name: "English"
  },
  {
    code: "ar",
    file: "ar.json",
    name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    dir: "rtl",
    pluralRule: (choice) => {
      const name = new Intl.PluralRules("ar-EG").select(choice);
      return { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 }[name];
    }
  },
  {
    code: "ckb",
    file: "ckb.json",
    name: "\u06A9\u0648\u0631\u062F\u06CC\u06CC \u0646\u0627\u0648\u06D5\u0646\u062F\u06CC",
    dir: "rtl",
    pluralRule: (choice) => {
      const name = new Intl.PluralRules("ckb").select(choice);
      return { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 }[name];
    }
  },
  {
    code: "fa-IR",
    file: "fa-IR.json",
    name: "\u0641\u0627\u0631\u0633\u06CC",
    dir: "rtl",
    pluralRule: (choice) => {
      const name = new Intl.PluralRules("fa-IR").select(choice);
      return { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 }[name];
    }
  },
  {
    code: "ca",
    file: "ca.json",
    name: "Catal\xE0"
  },
  {
    code: "de-DE",
    file: "de-DE.json",
    name: "Deutsch"
  },
  {
    code: "hu-HU",
    file: "hu-HU.json",
    name: "Magyar"
  },
  {
    code: "zh-CN",
    file: "zh-CN.json",
    name: "\u7B80\u4F53\u4E2D\u6587"
  },
  {
    code: "zh-TW",
    file: "zh-TW.json",
    name: "\u7E41\u9AD4\u4E2D\u6587"
  },
  {
    code: "ja-JP",
    file: "ja-JP.json",
    name: "\u65E5\u672C\u8A9E"
  },
  {
    code: "nl-NL",
    file: "nl-NL.json",
    name: "Nederlands"
  },
  {
    code: "es",
    file: "es.json",
    name: "Espa\xF1ol"
  },
  {
    code: "eu-ES",
    file: "eu-ES.json",
    name: "Euskara"
  },
  {
    code: "fr-FR",
    file: "fr-FR.json",
    name: "Fran\xE7ais"
  },
  {
    code: "ru-RU",
    file: "ru-RU.json",
    name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
    pluralRule: (choice) => {
      const name = new Intl.PluralRules("ru-RU").select(choice);
      return { zero: 2, one: 0, two: 1, few: 1, many: 2, other: 3 }[name];
    }
  },
  {
    code: "uk-UA",
    file: "uk-UA.json",
    name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    pluralRule: (choice) => {
      if (choice === 0)
        return 0;
      const name = new Intl.PluralRules("uk-UA").select(choice);
      return { zero: 0, one: 1, two: 0, few: 2, many: 3, other: 4 }[name];
    }
  },
  {
    code: "cs-CZ",
    file: "cs-CZ.json",
    name: "\u010Cesky"
  },
  {
    code: "pl-PL",
    file: "pl-PL.json",
    name: "Polski",
    pluralRule: (choice) => {
      if (choice === 0)
        return 0;
      const name = new Intl.PluralRules("pl-PL").select(choice);
      return { zero: 0, one: 1, two: 0, few: 2, many: 3, other: 4 }[name];
    }
  },
  {
    code: "pt",
    file: "pt.json",
    name: "Portugu\xEAs"
  },
  {
    code: "tr-TR",
    file: "tr-TR.json",
    name: "T\xFCrk\xE7e"
  },
  {
    code: "id-ID",
    file: "id-ID.json",
    name: "Indonesia"
  },
  {
    code: "fi-FI",
    file: "fi-FI.json",
    name: "Suomi"
  },
  {
    code: "gl-ES",
    file: "gl-ES.json",
    name: "Galego"
  },
  {
    code: "ko-KR",
    file: "ko-KR.json",
    name: "\uD55C\uAD6D\uC5B4"
  },
  {
    code: "it-IT",
    file: "it-IT.json",
    name: "Italiano"
  },
  {
    code: "th-TH",
    file: "th-TH.json",
    name: "\u0E44\u0E17\u0E22"
  },
  {
    code: "tl-PH",
    file: "tl-PH.json",
    name: "Tagalog"
  },
  {
    code: "vi-VN",
    file: "vi-VN.json",
    name: "Ti\u1EBFng Vi\u1EC7t"
  }
];
function buildLocales() {
  const useLocales = Object.values(locales).reduce((acc, data) => {
    const locales2 = countryLocaleVariants[data.code];
    if (locales2) {
      locales2.forEach((l) => {
        const entry = {
          ...data,
          code: l.code,
          name: l.name,
          files: [data.file, `${l.code}.json`]
        };
        delete entry.file;
        acc.push(entry);
      });
    } else {
      acc.push(data);
    }
    return acc;
  }, []);
  return useLocales.sort((a, b) => a.code.localeCompare(b.code));
}
const currentLocales = buildLocales();
const datetimeFormats = Object.values(currentLocales).reduce((acc, data) => {
  const dateTimeFormats = data.dateTimeFormats;
  if (dateTimeFormats) {
    acc[data.code] = { ...dateTimeFormats };
    delete data.dateTimeFormats;
  } else {
    acc[data.code] = {
      shortDate: {
        dateStyle: "short"
      },
      short: {
        dateStyle: "short",
        timeStyle: "short"
      },
      long: {
        dateStyle: "long",
        timeStyle: "medium"
      }
    };
  }
  return acc;
}, {});
const numberFormats = Object.values(currentLocales).reduce((acc, data) => {
  const numberFormats2 = data.numberFormats;
  if (numberFormats2) {
    acc[data.code] = { ...numberFormats2 };
    delete data.numberFormats;
  } else {
    acc[data.code] = {
      percentage: {
        style: "percent",
        maximumFractionDigits: 1
      },
      smallCounting: {
        style: "decimal",
        maximumFractionDigits: 0
      },
      kiloCounting: {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1
      },
      millionCounting: {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 2
      }
    };
  }
  return acc;
}, {});
const pluralRules = Object.values(currentLocales).reduce((acc, data) => {
  const pluralRule = data.pluralRule;
  if (pluralRule) {
    acc[data.code] = pluralRule;
    delete data.pluralRule;
  }
  return acc;
}, {});
const i18n_config = () => {
  return {
    legacy: false,
    availableLocales: currentLocales.map((l) => l.code),
    fallbackLocale: "en-US",
    fallbackWarn: true,
    missingWarn: true,
    datetimeFormats,
    numberFormats,
    pluralRules
  };
};

export { i18n_config as default };
