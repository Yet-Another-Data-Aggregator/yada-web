/**
 * Side navbar component
 *
 * creates navbar component that can be developed further to implement both levels of the dynamic side navbar
 */

import { fireAuthSignOut } from 'scripts/Datastore';
import React, { ReactElement } from 'react';
import { Link, Route, useLocation, useRouteMatch } from 'react-router-dom';

/**
 * autoCollapse: if true, the navbar compresses itself and expands when hovered. Ideal if icons are used
 * roundRightCornser: if true, all 4 corners of the navbar are rounded. if false on the left two are. This will need to be expanded upon later if this component is used to create multiple levels of navbars
 * currentPrivilege: privilege of the current user
 * active route: the active route
 */
interface navbarProps {
    autoCollapse: Boolean;
    roundRightCorners: Boolean;
    currentPrivilege: string;
    children: ReactElement | ReactElement[];
}

/**
 * name: text to display on the nav item
 * route: the route switched to upon clicking the nav item
 * currentRoute: the current route the user is on (used to highlight the current route)
 * requiredPermissions: permissions required to navigate to this route
 * currentPermission: permission level of the current user
 */
interface StaticNavItemProp {
    label: string;
    route: string;
    icon: any;
    hasDynamicNavbar?: boolean;
    children: ReactElement;
}

/**
 * Navigation item
 * @param props
 */
export function StaticNavItem(props: StaticNavItemProp) {
    // used to match the route
    let currentRoute = useLocation();
    const { url } = useRouteMatch();

    /**
     * returns empty div if the permissions are not met
     */
    return (
        <Link to={`${url}/${props.route}`}>
            <div
                className={`navItem ${
                    // renders active highlight
                    currentRoute.pathname.startsWith(`${url}/${props.route}`)
                        ? 'active'
                        : 'inactive'
                }`}
            >
                <div className="navIcon">
                    <img src={props.icon} alt={props.route} />
                </div>
                <div className="navTitle">{props.label}</div>
            </div>
        </Link>
    );
}

/**
 * Side navbar
 * @param props
 */
export default function StaticNavbar(props: navbarProps) {
    // matches location
    let location = useLocation();
    const { path } = useRouteMatch();
    let hasDynamicNavbar = new Map<string, boolean>();

    React.Children.map(props.children, (child) => {
        const route = `${path}/${child.props.route}`;

        if (location.pathname.startsWith(route))
            hasDynamicNavbar.set(
                location.pathname,
                child.props.hasDynamicNavbar
            );
    });

    // generates routes for a child
    function createRoute(child: ReactElement) {
        return (
            <Route path={`${path}/${child.props.route}`}>
                {child.props.children}
            </Route>
        );
    }

    return (
        <>
            <div className="staticNavbar">
                <div
                    // styles navbar dynamically based on route and props
                    className={`navPadding ${
                        !props.autoCollapse ? 'noCollapse' : ''
                    } ${
                        props.roundRightCorners &&
                        !hasDynamicNavbar.get(location.pathname)
                            ? 'roundAllCorners'
                            : 'roundLeftCorners'
                    }
                    ${
                        location.pathname.startsWith('/app/dashboard')
                            ? 'noCollapse'
                            : ''
                    }`}
                >
                    <div className={`navLinks`}>{props.children}</div>
                    <div
                        className={`navItem inactive logoutItem`}
                        onClick={() => {
                            fireAuthSignOut();
                        }}
                    >
                        <div className={`navIcon logout`} />
                        <div className="navTitle">Logout</div>
                    </div>
                </div>
            </div>
            {/* renders children routes */}
            <div className="staticRoutes">
                {React.Children.map(props.children, createRoute)}
            </div>
        </>
    );
}
