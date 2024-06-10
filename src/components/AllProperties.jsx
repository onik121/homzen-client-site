import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useProperties from '../hooks/useProperties';
import PropertyCard from './PropertyCard';
import { Helmet } from 'react-helmet';

const AllProperties = () => {

    const [properties] = useProperties();

    return (
        <div className='mt-7'>
            <Helmet>
                <title>Homzen | All Properties </title>
            </Helmet>
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
                        <div className='Property-cart-container'>
                            {
                                properties.filter(item => item.verification_status === 'verified').map(item => <PropertyCard item={item}></PropertyCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='Property-cart-container'>
                            {
                                properties.filter(item => item.apartment_type === 'house' && item.verification_status === 'verified').map(item => <PropertyCard item={item}></PropertyCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='Property-cart-container'>
                            {
                                properties.filter(item => item.apartment_type === 'villa' && item.verification_status === 'verified').map(item => <PropertyCard item={item}></PropertyCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='Property-cart-container'>
                            {
                                properties.filter(item => item.apartment_type === 'office' && item.verification_status === 'verified').map(item => <PropertyCard item={item}></PropertyCard>)
                            }
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default AllProperties;