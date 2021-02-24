import React from 'react';

import Link from '@material-ui/core/Link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Styles from './Contact';

const Contact = (props) => {

    const classes = Styles.useStyles();

    return (
        <div className={classes.infoContact}>
            <Link href='https://twitter.com/martinrouede'>
                <FontAwesomeIcon icon={faTwitter} className={classes.icon} />
            </Link>
            <Link href='https://github.com/martinrouede'>
                <FontAwesomeIcon icon={faGithub} className={classes.icon} />
            </Link>
        </div>
    );
}

export default Contact;
