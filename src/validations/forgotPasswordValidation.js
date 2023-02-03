import * as Yup from "yup";
import i18next from "i18next";

export default Yup.object().shape({
  email: Yup.string()
    .email(i18next.t("login.emailFormat"))
    .required(i18next.t("login.emailRequired")),
});
