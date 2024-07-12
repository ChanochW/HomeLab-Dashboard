import {ReactElement} from "react";
import { GrStorage } from "react-icons/gr";
import { MdOutlinePermMedia, MdOutlineDns } from "react-icons/md";
import { GiFirewall } from "react-icons/gi";
import { LuListMusic } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";

export interface ApplicationType {
    name: string;
    url: string;
    description: string;
    icon: ReactElement;
    section: SectionType;
}

enum SectionType {NETWORK, MEDIA, STORAGE, COMMUNICATION, TESTBED}

export const Applications: ApplicationType[] = [
    {
        name: "TrueNas",
        url: "",
        description: "A robust, open-source storage platform for managing and protecting your data.",
        icon: <GrStorage />,
        section: SectionType.STORAGE
    },
    {
        name: "Plex",
        url: "",
        description: "A powerful media server solution to organize and stream your personal media library.",
        icon: <MdOutlinePermMedia />,
        section: SectionType.MEDIA
    },
    {
        name: "PiHole",
        url: "",
        description: "A network-wide self hosted DNS server.",
        icon: <MdOutlineDns />,
        section: SectionType.NETWORK
    },
    {
        name: "pfSense",
        url: "",
        description: "A feature-rich firewall and router platform based on FreeBSD.",
        icon: <GiFirewall />,
        section: SectionType.NETWORK
    },
    {
        name: "MyMusic",
        url: "",
        description: "A personalized music server to manage and play your music collection.",
        icon: <LuListMusic />,
        section: SectionType.MEDIA
    },
    {
        name: "Family Messaging",
        url: "",
        description: "A secure messaging app for family communication.",
        icon: <AiOutlineMessage />,
        section: SectionType.COMMUNICATION
    },
    {
        name: "Package Pilot",
        url: "",
        description: "Navigating Deliveries, Simplifying Logistics",
        icon: <FiPackage />,
        section: SectionType.COMMUNICATION
    }
]