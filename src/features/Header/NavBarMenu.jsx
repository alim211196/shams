import React, { useState } from "react";
import TranslatableLinks from "../../common/TranslatableLinks";

const NavBarMenu = ({
  hideInArabicFields,
  lang,
  formData,
  setFormData,
  handleChange,
  activeLang,
}) => {
  const [navMenu, setNavMenu] = useState([]);
  return (
    <TranslatableLinks
      hideInArabicFields={hideInArabicFields}
      lang={lang}
      links={navMenu}
      setLinks={setNavMenu}
      formData={formData}
      handleChange={handleChange}
      setFormData={setFormData}
      activeLang={activeLang}
      labelField={"header_nav_label"}
      urlField={"header_nav_url"}
    />
  );
};

export default NavBarMenu;
