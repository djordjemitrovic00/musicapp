import * as Yup from "yup";
import i18next from "i18next";

export default Yup.object().shape({
  username: Yup.string().required("register.usernameRequired"),
  email: Yup.string()
    .email(i18next.t("register.emailFormat"))
    .required(i18next.t("register.emailRequired")),
  password: Yup.string()
    .required(i18next.t("register.passwordRequired"))
    .min(8, i18next.t("register.passwordLength")),
});
