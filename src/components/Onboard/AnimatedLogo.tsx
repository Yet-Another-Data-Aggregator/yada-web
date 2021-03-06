import { ReactComponent as LogoBlades } from 'assets/images/logo-blades.svg';
import { ReactComponent as LogoBox } from 'assets/images/logo-box.svg';

/**
 * Component to display animated YADA logo.
 *
 * @constructor
 */
export default function AnimatedLogo() {
    return (
        <div className="animatedLogo">
            <LogoBox className="logoBox" />
            <LogoBlades className="logoBlades" />
        </div>
    );
}
