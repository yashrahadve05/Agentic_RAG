export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
}

export interface UseCase {
  industry: string;
  description: string;
  icon: string;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: string;
}
