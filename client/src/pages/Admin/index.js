
import { Tabs } from "antd";
import MovieList from "./MovieList";

function Admin() {

    const tabItems = [
        {
          key: '1',
          label: 'Movies',
          children: <div><MovieList/></div>
        },
        {
          key: '2',
          label: 'Theatres',
          children: <div>Theatres</div>
        }
      ];
    return (
    <Tabs defaultActiveKey="1" items={tabItems}/>
    )
}

export default Admin;