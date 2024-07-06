import { getUserForSidebar } from "../controller/user.controller";
import protectRoute from "../middleware/protectRoute";
import router from "./auth.routes";

const router = express.Router();

router.get("/",protectRoute,getUserForSidebar);      //as the name suggests , this will be used to fetch the users for the sidebar

export default router;