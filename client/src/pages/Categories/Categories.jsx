import React from 'react'
import BlogCard from '../../components/Blog Card/BlogCard';

const Categories = () => {
    const data = [
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
        {
          img: "../temp.jpg",
          title: "Lorem Ipsum",
          desccription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, odit cum voluptatem veritatis enim eum.",
        },
      ];
  return (
    <div className="mb-4 py-4">
      <div className="flex flex-col gap-8 lg:gap-4">
        {data && data.map((items, i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <BlogCard items={items} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories