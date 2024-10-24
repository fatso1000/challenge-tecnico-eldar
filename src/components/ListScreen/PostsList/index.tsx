import {
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FormDialog from "../../FormDialog";
import {
  addPost,
  deletePost,
  getPost,
  getPostsList,
  updatePost,
} from "../../../queryFn";
import dialogStore from "../../../store/dialogStore";
import alertStore from "../../../store/alertStore";
import userStore from "../../../store/mainStore";
import PostForm from "../../Forms/PostForm";
import { IPost, UserRoleEnum } from "../../../types";
import { columnsInitial, initialFormDataPost } from "../../../shared/constants";
import RemoveModal from "../../RemoveModal";
import CustomDataGrid from "../../CustomDataGrid";

export default function PostList() {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [postList, setPostList] = useState<IPost[]>([]);
  const [formData, setFormData] = useState<IPost>(initialFormDataPost);

  const dialog = dialogStore();
  const user = userStore();
  const showAlert = alertStore((state) => state.showAlert);

  useEffect(() => {
    fetchPostList();
  }, []);

  const fetchPostList = async () => {
    try {
      const request = await getPostsList<IPost[]>();
      setPostList(request.data || []);
    } catch (error: unknown) {
      setPostList([]);
      showAlert("Error fetching post list", "error");
    }
  };

  const fetchPostById = async (id: number) => {
    try {
      const request = await getPost<IPost>(id);
      setFormData(request.data || initialFormDataPost);
    } catch (error: unknown) {
      setFormData(initialFormDataPost);
      showAlert("Error during post fetch", "error");
    }
  };

  const handleEditPost = async (id: number) => {
    await fetchPostById(id);
    setIsEdit(true);
    dialog.handleClickOpen(id);
  };

  const handleAddPost = () => {
    setIsEdit(false);
    dialog.handleClickOpen();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const removeSelectedPost = async () => {
    if (selectedPost === null) return;
    try {
      await deletePost(selectedPost);
      setPostList(postList.filter((post) => post.id !== selectedPost));
      showAlert("Post deleted successfully!", "success");
    } catch (error: unknown) {
      showAlert("Error during post deletion", "error");
    } finally {
      setIsModalOpen(false);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formRequest();
  };

  const formRequest = async () => {
    try {
      const body = {
        ...formData,
        userId: user.user?.id,
      };

      const request = isEdit
        ? await updatePost<IPost>(dialog.id!, body)
        : await addPost<IPost>(body);

      if (request.data) {
        const updatedPostList = isEdit
          ? postList.map((post) =>
              post.id === request.data!.id ? request.data! : post
            )
          : [...postList, request.data!];

        setPostList(updatedPostList);
        setFormData(initialFormDataPost);
        dialog.handleClose();
        showAlert(
          isEdit ? "Post updated successfully" : "Post created successfully",
          "success"
        );
      } else {
        showAlert(
          `Error during post ${isEdit ? "update" : "creation"}`,
          "error"
        );
      }
    } catch (error: unknown) {
      showAlert("Error during post API request", "error");
    }
  };

  // Memoized columns for optimization
  const columns: GridColDef[] = [
    ...columnsInitial,
    ...(user.userRole === UserRoleEnum.admin
      ? ([
          {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            getActions: ({ id }: { id: string }) => [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleEditPost(+id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  setSelectedPost(+id);
                  setIsModalOpen(true);
                }}
                color="inherit"
              />,
            ],
          },
        ] as GridColDef[])
      : []),
  ];

  return (
    <Paper sx={{ height: 550, width: "100%", px: 2 }}>
      <CustomDataGrid
        disableToolbar={user.userRole === UserRoleEnum.user}
        columns={columns}
        CustomToolbar={() => (
          <GridToolbarContainer className="w-full justify-end my-2">
            <Button
              onClick={handleAddPost}
              variant="outlined"
              className="ml-auto"
              startIcon={<AddIcon />}
            >
              ADD
            </Button>
          </GridToolbarContainer>
        )}
        rows={postList}
      />
      <FormDialog
        onClose={() => setFormData(initialFormDataPost)}
        onSubmit={submitForm}
        title={isEdit ? "Edit Post" : "Add Post"}
      >
        <PostForm formData={formData} handleInputChange={handleInputChange} />
      </FormDialog>
      <RemoveModal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        removeSelectedPost={removeSelectedPost}
      />
    </Paper>
  );
}
