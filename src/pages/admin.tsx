import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/Navbar";
import PostList from "../components/ListScreen/PostsList";

function AdminPage() {
  return (
    <Box>
      <ResponsiveAppBar />
      <PostList />
    </Box>
  );
}

export default AdminPage;
