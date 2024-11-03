import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import Button, { buttonVariants } from "../button/Button";
import classes from "./header.module.scss";

const links = [
  { name: "О нас", href: "" },
  { name: "База кандидатов", href: "/candidates" },
  { name: "Тарифы", href: "" },
];

function Header() {
  const [isOpen, setOpen] = useState(false);
  const width = useWindowWidth();
  const MOBILE = width < 767;

  return (
    <header className={classes.header}>
      <div styles={{ overflow: "hidden" }} className={classes.headerContainer}>
        <Link className={classes.logo} to="/">
        стартрикс ✨

        </Link>
        <nav className={classes.nav}>
          <ul>
            {links.length > 0
              ? links.map((link) => (
                  <li>
                    <Link className={classes.navLink} to={link.href}>
                      {link.name}
                    </Link>
                  </li>
                ))
              : "Другие страницы недоступны"}
          </ul>
        </nav>
        <div className={classes.authorisation}>
          <Button variant={buttonVariants.SECONDARY} text={"Войти"} />
          <Button variant={buttonVariants.PRIMARY} text={"Регистрация"} />
          {MOBILE && (
            <Hamburger
              className={classes.burgerButton}
              duration={0.8}
              toggled={isOpen}
              toggle={setOpen}
            ></Hamburger>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
