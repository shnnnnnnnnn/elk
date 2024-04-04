import { q as useUserSettings, a_ as useRuntimeConfig } from './server.mjs';
import { reactive, ref } from 'vue';

const supportedTranslationCodes = [
  "ar",
  "az",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "eo",
  "es",
  "fa",
  "fi",
  "fr",
  "ga",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "nl",
  "pl",
  "pt",
  "ru",
  "sk",
  "sv",
  "tr",
  "uk",
  "vi",
  "zh"
];
function getLanguageCode() {
  let code = "en";
  return code;
}
async function translateText(text, from, to) {
  const config = useRuntimeConfig();
  const status = ref({
    success: false,
    error: "",
    text: ""
  });
  const regex = /<a[^>]*>.*?<\/a>/g;
  try {
    const response = await $fetch(config.public.translateApi, {
      method: "POST",
      body: {
        q: text,
        source: from ?? "auto",
        target: to,
        format: "html",
        api_key: ""
      }
    });
    status.value.success = true;
    status.value.text = response.translatedText.replace(regex, (match) => {
      const tagLink = regex.exec(text);
      return tagLink ? tagLink[0] : match;
    });
  } catch (err) {
    if (err.data?.error)
      status.value.error = err.data.error;
    else
      status.value.error = "Unknown Error, Please check your console in browser devtool.";
    console.error("Translate Post Error: ", err);
  }
  return status;
}
const translations = /* @__PURE__ */ new WeakMap();
function useTranslation(status, to) {
  if (!translations.has(status))
    translations.set(status, reactive({ visible: false, text: "", success: false, error: "" }));
  const translation = translations.get(status);
  const userSettings = useUserSettings();
  const shouldTranslate = "language" in status && status.language && status.language !== to && supportedTranslationCodes.includes(to) && supportedTranslationCodes.includes(status.language) && !userSettings.value.disabledTranslationLanguages.includes(status.language);
  const enabled = (
    /*! !useRuntimeConfig().public.translateApi && */
    shouldTranslate
  );
  async function toggle() {
    if (!shouldTranslate)
      return;
    if (!translation.text) {
      const translated = await translateText(status.content, status.language, to);
      translation.error = translated.value.error;
      translation.text = translated.value.text;
      translation.success = translated.value.success;
    }
    translation.visible = !translation.visible;
  }
  return {
    enabled,
    toggle,
    translation
  };
}

export { getLanguageCode as g, supportedTranslationCodes as s, useTranslation as u };
