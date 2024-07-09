import {FunctionComponent} from "react";
import {GiSpy} from "react-icons/gi";

import styles from './site_branding.module.css'

export const SiteBranding: FunctionComponent = () => {
    return (
        <div className={styles.navbarBrand}>
            <GiSpy size={64}/>
            <span>HomeLab Portal</span>
        </div>
    );
}