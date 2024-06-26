import{r as t,b as n,A as r,j as e,f as C,L as D}from"./index-10Jx05Y7.js";const S=()=>{const[i,o]=t.useState([]),[u,j]=t.useState(!0),[f,c]=t.useState(!1),[a,x]=t.useState(null),[h,p]=t.useState(null);t.useEffect(()=>{y()},[]);const y=async()=>{try{const s=await n.get(`${r}/classes`),g=(await Promise.all(s.data.map(async l=>{const d=await n.get(`${r}/classes/${l.id}/students`),w=await n.get(`${r}/classes/${l.id}/teachers`);return{...l,studentCount:d.data.length,teacherCount:w.data.length}}))).sort((l,d)=>l.level-d.level);o(g)}catch(s){console.error("Error fetching data:",s)}finally{j(!1)}},b=async()=>{if(a)try{await n.delete(`${r}/classes/${a.id}`),o(i.filter(s=>s.id!==a.id)),c(!1),x(null),p(null)}catch(s){console.error("Error deleting class:",s),p("you can't dlete this class.")}},N=s=>{x(s),c(!0)};return u?e.jsx(C,{}):e.jsxs("div",{className:"container mx-auto p-4",children:[e.jsx("div",{className:"flex justify-between items-center mb-4",children:e.jsx("h1",{className:"text-2xl font-bold",children:"Class List"})}),e.jsxs("table",{className:"min-w-full table-auto",children:[e.jsx("thead",{className:"bg-gray-200",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-2 text-left",children:"No"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Name"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Description"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Students"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Teachers"}),e.jsx("th",{className:"px-4 py-2 text-left",children:"Actions"})]})}),e.jsx("tbody",{children:i.map((s,m)=>e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-4 py-2",children:m+1}),e.jsx("td",{className:"px-4 py-2",children:s.name}),e.jsx("td",{className:"px-4 py-2",children:s.description}),e.jsx("td",{className:"px-4 py-2",children:s.studentCount}),e.jsx("td",{className:"px-4 py-2",children:s.teacherCount}),e.jsxs("td",{className:"px-4 py-2 flex gap-2",children:[e.jsx(D,{to:`/admin/classes/${s.id}`,className:"px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600",children:"View"}),e.jsx("button",{onClick:()=>N(s),className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800",children:"Delete"})]})]},s.id))})]}),f&&a&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-8 rounded shadow-md text-center",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Confirm Deletion"}),e.jsxs("p",{children:['Are you sure you want to delete the class "',a.name,'"?']}),h&&e.jsx("p",{className:"text-red-500",children:h}),e.jsxs("div",{className:"mt-4 flex justify-center gap-4",children:[e.jsx("button",{onClick:b,className:"px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800",children:"Yes, Delete"}),e.jsx("button",{onClick:()=>c(!1),className:"px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500",children:"Cancel"})]})]})})]})};export{S as default};