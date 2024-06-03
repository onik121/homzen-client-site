import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useProperties from '../hooks/useProperties';

const AllProperties = () => {

    const [properties] = useProperties();
    // console.log(properties)


    return (
        <div className='mt-10'>
            <Tabs>
                <div className='flex justify-center'>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>House</Tab>
                        <Tab>Villa</Tab>
                        <Tab>Office</Tab>
                    </TabList>
                </div>

                <div className='mt-5'>
                    <TabPanel>
                        <div className='job-cart-container'>
                            {/* {
                                jobs.map(job => <JobCart key={job._id} job={job}></JobCart>)
                            } */}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='job-cart-container'>
                            {
                                properties.filter( item => item.apartment_type === 'house').map( item => console.log(item))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='job-cart-container'>
                            {/* {
                                jobs.filter(j => j.category === 'Remote Job').map(job => <JobCart key={job._id} job={job}></JobCart>)
                            } */}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='job-cart-container'>
                            {/* {
                                jobs.filter(j => j.category === 'Part-Time').map(job => <JobCart key={job._id} job={job}></JobCart>)
                            } */}
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default AllProperties;