// NavItems.ts
export interface NavItem {
    label: string;
    to: string;
}

export interface MobileNavItemProps extends NavItem {
    children?: MobileNavItemProps[];
}

export interface DesktopNavProps {
    NAV_ITEMS: NavItem[];
}

export interface MobileNavProps {
    NAV_ITEMS: NavItem[];
}
