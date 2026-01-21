import { StockOutlined } from "@ant-design/icons";
import { Card, Timeline } from "antd";
import { Fragment, useState } from "react";
import { activityData } from "../mock_data/activityData";
import authStore from "../stores/authStore";

const ActivityList = () => {

    const { user } = authStore();
    const [activities] = useState(activityData.filter(u => u.userId === user.id))

    return <Card hoverable title={<><StockOutlined /> Recent Activity</>}>
        <Timeline
            items={activities.map(item => ({
                color: 'blue',
                children: (
                    <Fragment key={item.id}>
                        <p className="mb-0">{item.activity}</p>
                        <span className="small text-secondary">{item.date}</span>
                    </Fragment>
                ),
            }))}
        />
    </Card>
}

export default ActivityList;