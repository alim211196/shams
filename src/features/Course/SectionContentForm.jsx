import { Box, Button, Typography,Tabs, Tab } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';


const SectionContentForm = ({
    sectionId,
    courseContent,
    courseContentQuiz,
    courseContentLesson,
    handleEditContent,
    handleDeleteContent,
    sectionTabValue,
    handleTabChange
}) => {

    const extraContent = courseContent.filter((item) => item.course_section_id._id === sectionId);
    const quizContent = courseContentQuiz.filter((item) => item.course_section_id._id === sectionId);
    const videoContent = courseContentLesson.filter((item) => item.course_section_id._id === sectionId);
    
        const contentColumns = [
          {
            accessorKey: "title",
            header: "Title",
            size: 150,
          },
          {
            accessorKey: "file",
            header: "File",
            size: 120,
            Cell: ({ renderedCellValue }) => (
              <Typography variant="caption">{renderedCellValue || "Text"}</Typography>
            ),
          },
          {
            id: "actions",
            header: "Actions",
            size: 150,
            Cell: ({ row }) => (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEditContent(row.original._id)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteContent(row.original._id)}
                >
                  Delete
                </Button>
              </Box>
            ),
          },
        ];
    
      let contenData=sectionTabValue===0?quizContent:sectionTabValue===1?videoContent:extraContent;
    
        return (
          <Box sx={{ padding: '16px', backgroundColor: '#f9f9f9' }}>
            <Tabs value={sectionTabValue} onChange={handleTabChange} aria-label="content tabs">
            <Tab label="Quiz" />
            <Tab label="Lesson" />
            <Tab label="Extra Material" />
          </Tabs>
              <MaterialReactTable
                columns={contentColumns}
                data={contenData}
                enablePagination={false}
                enableSorting={false}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableTopToolbar={false}
                enableBottomToolbar={false}
                muiTableContainerProps={{
                  sx: { maxHeight: '300px' },
                }}
              />
          </Box>
  )
}

export default SectionContentForm