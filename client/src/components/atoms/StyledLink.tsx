import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { UrlObject } from "url";
interface StyledLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  type?: string;
  href: string | UrlObject;
}

export default function StyledLink(props: StyledLinkProps) {
  return props.type === "external" ? (
    <a
      className={clsx(props.className)}
      href={typeof props.href === "string" ? props.href : "/"}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ) : (
    <Link passHref href={props.href} className={clsx(props.className)}>
      {props.children}
    </Link>
  );
}
