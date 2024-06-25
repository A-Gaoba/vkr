import{r as a,j as s,L as o,b as m,A as h}from"./index-B_5xIYw0.js";const w=()=>{const[d,x]=a.useState([]),[u,p]=a.useState([]),[g,n]=a.useState(!0),[i,b]=a.useState(null),[t,j]=a.useState(null);if(a.useEffect(()=>{(async()=>{n(!0);try{const[l,N]=await Promise.all([m.get(`${h}/subjects`),m.get(`${h}/classes`)]),v=l.data.sort((r,c)=>r.name.localeCompare(c.name)),S=N.data.sort((r,c)=>r.level-c.level);x(v),p(S)}catch(l){console.error("Error fetching data:",l),b("Failed to fetch data")}finally{n(!1)}})()},[]),g)return s.jsx("div",{children:"Loading..."});if(i)return s.jsx("div",{className:"text-red-500",children:i});const f=t?d.filter(e=>e.class&&e.class.id===t):d;return s.jsxs("div",{className:"container mx-auto p-6 bg-white rounded-lg shadow-md",children:[s.jsxs("div",{className:"flex justify-between items-center mb-4",children:[s.jsx("h1",{className:"text-2xl font-bold",children:"Subjects"}),s.jsx(o,{to:"/admin/subjects/add",className:"mt-4 px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600",children:"Add Subject"})]}),s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"mr-2",children:"Filter by Class:"}),s.jsxs("select",{title:"classes",className:"p-2 border border-gray-300 rounded",value:t||"",onChange:e=>j(e.target.value?Number(e.target.value):null),children:[s.jsx("option",{value:"",children:"All Classes"}),u.map(e=>s.jsx("option",{value:e.id,children:e.name},e.id))]})]}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:f.map(e=>s.jsxs("div",{className:"bg-gray-100 p-4 rounded-lg shadow-md",children:[s.jsx("h2",{className:"text-xl font-bold mb-2",children:e.name}),s.jsx("p",{className:"mb-2",children:e.description}),s.jsxs("p",{className:"mb-2",children:["Teacher: ",e.teacher?`${e.teacher.firstName} ${e.teacher.lastName}`:"None"]}),s.jsxs("p",{className:"mb-2",children:["Class: ",e.class?e.class.name:"None"]}),s.jsx(o,{to:`/admin/subjects/${e.id}`,className:"mt-4 px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600",children:"View"})]},e.id))})]})};export{w as default};