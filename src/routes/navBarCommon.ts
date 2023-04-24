import { PATH_NAME } from '../configs';
import { Home } from '@mui/icons-material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ContactsIcon from '@mui/icons-material/Contacts';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SourceIcon from '@mui/icons-material/Source';
import { NavBarCommon } from '../models/NavBar';

export const navBarCommon: NavBarCommon[] = [
    {
        title: 'Trang chủ',
        icon: Home,
        href: PATH_NAME.ROOT
    },
    {
        title: 'Lãnh đạo',
        icon: EngineeringIcon,
        href: PATH_NAME.ROOT,
        items: [
            {
                title: 'Chờ duyệt',
                icon: PendingActionsIcon,
                href: PATH_NAME.PENDING
            },
            {
                title: 'Chấp thuận',
                icon: AssignmentTurnedInIcon,
                href: PATH_NAME.APPROVED
            }
        ]
    },
    {
        title: 'Quản lý nhân viên',
        icon: ContactsIcon,
        href: PATH_NAME.ROOT,
        items: [
            {
                title: 'Tạo mới',
                icon: PersonAddIcon,
                href: PATH_NAME.NEW_EMPLOYEE
            },
            {
                title: 'Quản lý',
                icon: FolderSharedIcon,
                href: PATH_NAME.MANAGE_EMPLOYEE
            },
            {
                title: 'Kết thúc',
                icon: NotificationsIcon,
                href: PATH_NAME.END_EMPLOYEE
            },
            {
                title: 'Nội dung liên quan',
                icon: SourceIcon,
                href: PATH_NAME.RELATED_EMPLOYEE
            }
        ]
    }
];
