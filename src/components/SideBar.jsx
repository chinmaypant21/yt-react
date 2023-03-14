import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";
import { height } from "@mui/system";

const Categories = ({ selectedCategory, setSelectedCategory, sideBar, showSideBar }) => (
    <div style={{width: showSideBar ? '15vw' : '0'}}>
    <Stack
    direction="row"
    sx={{
        backgroundColor: 'var(--bg-color)',
        zIndex:'1',
        overflowY: "hidden",
        height:'89vh',
        width:'15vw',
        position:'fixed',
        paddingTop: '0.5vw',
        flexDirection: { md: "column" },
        // display: showSideBar ? 'flex' : 'none',
        visibility: sideBar ? 'visible' : 'hidden',
        "&:hover":{
            overflowY:'scroll'
        }
    }}
    >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory({title:category.name, icon:category.icon})}
        style={{background: category.name === selectedCategory.title && "var(--highlight-color)"}}
        key={category.name}
      >
        <span style={{marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory.title ? "1" : "0.8" }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
  </div>
);

export default Categories;