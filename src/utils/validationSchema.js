import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Не правильная электронная почта")
    .required("Введите электронную почту"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Введите пароль"),
});

export const createStatementFormSchema = yup.object().shape({
  leader: yup.string().required("Выберите руководство"),
  theme: yup.string().required("Введите тему заявления"),
  message: yup.string().required("Введите сообщение заявления"),
  files: yup
    .mixed()
    .test("fileSize", "Размер файла не должен превысить 5МБ", (value) => {
      let isVerified = false;

      if (value.length) {
        for (let i = 0; i < value.length; i++) {
          if (value[0].size <= 5 * 1024 * 1024) {
            isVerified = true;
          } else {
            isVerified = false;
          }
        }
        return isVerified;
      } else {
        return true;
      }
    })
    .test(
      "fileType",
      "Вы можете загружать файлы с расширениями JP(E)G, DOC(X), PDF",
      (value) => {
        const FILE_TYPES = [
          "image/jpeg",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        let isVerified = false;

        if (value.length) {
          for (let i = 0; i < value.length; i++) {
            if (FILE_TYPES.includes(value[i].type)) {
              isVerified = true;
            } else {
              isVerified = false;
            }
          }
          return isVerified;
        } else {
          return true;
        }
      }
    ),
});

export const createStatementSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(3, "Ф.И.О должен содержать минимум 3 символа")
      .required("Введите Ф.И.О"),
    recipient: yup
      .string()
      .matches(
        /^[+]?998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/,
        "Номер телефона не правильный"
      )
      .required("Введите номер телефона"),
    email: yup
      .string()
      .email("Не правильная электронная почта")
      .required("Введите электронную почту"),
    address: yup
      .string()
      .min(3, "Адрес должен содержать минимум 3 символа")
      .required("Введите адрес"),
  })
  .concat(createStatementFormSchema);

yup.addMethod(yup.string, "integer", function () {
  return this.matches(/^\d+$/, "Только цифры");
});

export const smsVerifySchema = yup.object().shape({
  smsCode: yup
    .string()
    .integer()
    .min(5, "Код должен содержать 5 цифр")
    .max(5, "Код должен содержать 5 цифр")
    .required("Введите номер телефона"),
});

export const messageSendSchema = yup.object().shape({
  message: yup.string().required("Введите сообщение"),
});
