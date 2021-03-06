import { Link, useParams } from 'react-router-dom';

interface SiteEquipmentBackButtonProps {
    // The name of the site to go back to.
    label: string;
}

/**
 * Creates a simple back button for the SiteEquipment page.
 *
 * @param siteName The name of the site to go back to.
 * @constructor
 */
export function SiteEquipmentBackButton({
    label,
}: SiteEquipmentBackButtonProps) {
    const { siteId }: any = useParams();

    return (
        <Link to={`/app/sites/${siteId}`}>
            <div className={'site-equipment-back-button'}>
                <svg version="1.1" width="28" height="28" viewBox="0 0 24 24">
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
                {label}
            </div>
        </Link>
    );
}
