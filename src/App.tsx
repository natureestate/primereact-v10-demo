import { useState, useRef } from 'react'
import './App.css'

// PrimeReact Components Import
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'
import { Slider } from 'primereact/slider'
import { ProgressBar } from 'primereact/progressbar'
import { Rating } from 'primereact/rating'
import { Menubar } from 'primereact/menubar'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Chip } from 'primereact/chip'
import { Badge } from 'primereact/badge'
import { Avatar } from 'primereact/avatar'
import { Tag } from 'primereact/tag'
import { Divider } from 'primereact/divider'
import { SelectButton } from 'primereact/selectbutton'
import { ToggleButton } from 'primereact/togglebutton'
import { InputSwitch } from 'primereact/inputswitch'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  // State สำหรับ Components ต่างๆ
  const [inputValue, setInputValue] = useState('')
  const [password, setPassword] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState([])
  const [date, setDate] = useState(null)
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('')
  const [textarea, setTextarea] = useState('')
  const [number, setNumber] = useState(0)
  const [sliderValue, setSliderValue] = useState(50)
  const [rating, setRating] = useState(0)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [toggleButton, setToggleButton] = useState(false)
  const [selectButtonValue, setSelectButtonValue] = useState('Option1')
  
  const toast = useRef(null)

  // Data สำหรับ Components
  const cities = [
    { name: 'กรุงเทพมหานคร', code: 'BKK' },
    { name: 'เชียงใหม่', code: 'CNX' },
    { name: 'ขอนแก่น', code: 'KKC' },
    { name: 'ภูเก็ต', code: 'HKT' },
    { name: 'หาดใหญ่', code: 'HDY' }
  ]

  const countries = [
    { name: 'ไทย', code: 'TH' },
    { name: 'สิงคโปร์', code: 'SG' },
    { name: 'มาเลเซีย', code: 'MY' },
    { name: 'เวียดนาม', code: 'VN' },
    { name: 'อินโดนีเซีย', code: 'ID' }
  ]

  const selectButtonOptions = [
    { label: 'ตัวเลือก 1', value: 'Option1' },
    { label: 'ตัวเลือก 2', value: 'Option2' },
    { label: 'ตัวเลือก 3', value: 'Option3' }
  ]

  const customers = [
    { id: 1, name: 'สมชาย ใจดี', country: 'ไทย', company: 'บริษัท เอบีซี', email: 'somchai@abc.com' },
    { id: 2, name: 'สมหญิง รักงาน', country: 'สิงคโปร์', company: 'บริษัท เอ็กซ์วายแซด', email: 'somying@xyz.com' },
    { id: 3, name: 'สมปอง ขยัน', country: 'มาเลเซีย', company: 'บริษัท 123', email: 'sompong@123.com' },
    { id: 4, name: 'สมศรี น่ารัก', country: 'ไทย', company: 'บริษัท DEF', email: 'somsri@def.com' },
    { id: 5, name: 'สมคิด เก่ง', country: 'เวียดนาม', company: 'บริษัท GHI', email: 'somkid@ghi.com' }
  ]

  const menuItems = [
    {
      label: 'หน้าแรก',
      icon: 'pi pi-home',
      command: () => showToast('success', 'นำทาง', 'ไปยังหน้าแรก')
    },
    {
      label: 'ผลิตภัณฑ์',
      icon: 'pi pi-box',
      items: [
        {
          label: 'สินค้าใหม่',
          icon: 'pi pi-plus',
          command: () => showToast('info', 'สินค้า', 'ดูสินค้าใหม่')
        },
        {
          label: 'สินค้าขายดี',
          icon: 'pi pi-star',
          command: () => showToast('info', 'สินค้า', 'ดูสินค้าขายดี')
        }
      ]
    },
    {
      label: 'ติดต่อเรา',
      icon: 'pi pi-phone',
      command: () => showToast('info', 'ติดต่อ', 'หน้าติดต่อเรา')
    }
  ]

  const breadcrumbItems = [
    { label: 'หน้าแรก', url: '/' },
    { label: 'ผลิตภัณฑ์', url: '/products' },
    { label: 'รายการสินค้า' }
  ]

  // Helper Functions
  const showToast = (severity: string, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 })
  }

  return (
    <div className="app-container">
      <Toast ref={toast} />
      
      {/* Navigation */}
      <Menubar 
        model={menuItems} 
        start={<span className="font-bold">🚀 PrimeReact V10 Demo</span>}
        end={
          <div className="flex align-items-center gap-2">
            <ThemeToggle />
            <Badge value="5" severity="danger">
              <Button icon="pi pi-bell" rounded text />
            </Badge>
            <Avatar 
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              shape="circle" 
            />
          </div>
        }
      />

      <div className="main-content">
        <h1 className="text-thai">🚀 PrimeReact V10 Components Demo</h1>
        <p className="text-thai">ตัวอย่างการใช้งาน PrimeReact Components สำหรับเวอร์ชัน 10</p>

        {/* Breadcrumb */}
        <BreadCrumb model={breadcrumbItems} home={{ icon: 'pi pi-home', url: '/' }} className="mb-4" />

        {/* Form Components Section */}
        <Card title="📝 Form Components" className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Basic Inputs */}
            <div className="flex flex-column gap-3">
              <h4>Basic Inputs</h4>
              <div>
                <label htmlFor="inputtext" className="block mb-2">Input Text:</label>
                <InputText 
                  id="inputtext"
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)} 
                  placeholder="พิมพ์ข้อความ..."
                  className="w-full"
                />
      </div>

              <div>
                <label htmlFor="password" className="block mb-2">Password:</label>
                <Password 
                  id="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="รหัสผ่าน"
                  toggleMask
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="textarea" className="block mb-2">Textarea:</label>
                <InputTextarea 
                  id="textarea"
                  value={textarea} 
                  onChange={(e) => setTextarea(e.target.value)} 
                  rows={3}
                  placeholder="พิมพ์ข้อความยาว..."
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="number" className="block mb-2">Input Number:</label>
                                  <InputNumber 
                    id="number"
                    value={number} 
                    onValueChange={(e) => setNumber(e.value || 0)} 
                    mode="currency" 
                    currency="THB" 
                    locale="th-TH"
                    className="w-full"
                  />
              </div>
            </div>

            {/* Selection Components */}
            <div className="flex flex-column gap-3">
              <h4>Selection Components</h4>
              <div>
                <label htmlFor="dropdown" className="block mb-2">Dropdown:</label>
                <Dropdown 
                  id="dropdown"
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.value)} 
                  options={cities} 
                  optionLabel="name" 
                  placeholder="เลือกเมือง"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="multiselect" className="block mb-2">MultiSelect:</label>
                <MultiSelect 
                  id="multiselect"
                  value={selectedCountries} 
                  onChange={(e) => setSelectedCountries(e.value)} 
                  options={countries} 
                  optionLabel="name" 
                  placeholder="เลือกประเทศ"
                  maxSelectedLabels={3}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="calendar" className="block mb-2">Calendar:</label>
                <Calendar 
                  id="calendar"
                  value={date} 
                  onChange={(e) => setDate(e.value || null)} 
                  dateFormat="dd/mm/yy"
                  placeholder="เลือกวันที่"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block mb-2">Select Button:</label>
                <SelectButton 
                  value={selectButtonValue} 
                  onChange={(e) => setSelectButtonValue(e.value)} 
                  options={selectButtonOptions} 
                />
              </div>
            </div>

            {/* Toggle & Rating Components */}
            <div className="flex flex-column gap-3">
              <h4>Toggle & Rating</h4>
              
              <div className="flex align-items-center">
                                  <Checkbox 
                    id="checkbox" 
                    checked={checked} 
                    onChange={(e) => setChecked(e.checked || false)} 
                  />
                <label htmlFor="checkbox" className="ml-2">ยอมรับเงื่อนไข</label>
              </div>

              <div className="flex flex-column gap-2">
                <div className="flex align-items-center">
                  <RadioButton 
                    id="radio1" 
                    name="radio" 
                    value="option1" 
                    onChange={(e) => setRadioValue(e.value)} 
                    checked={radioValue === 'option1'} 
                  />
                  <label htmlFor="radio1" className="ml-2">ตัวเลือก 1</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton 
                    id="radio2" 
                    name="radio" 
                    value="option2" 
                    onChange={(e) => setRadioValue(e.value)} 
                    checked={radioValue === 'option2'} 
                  />
                  <label htmlFor="radio2" className="ml-2">ตัวเลือก 2</label>
                </div>
              </div>

              <div className="flex align-items-center">
                <label htmlFor="switch" className="mr-2">Input Switch:</label>
                <InputSwitch 
                  id="switch"
                  checked={switchChecked} 
                  onChange={(e) => setSwitchChecked(e.value)} 
                />
              </div>

              <div>
                <ToggleButton 
                  checked={toggleButton} 
                  onChange={(e) => setToggleButton(e.value)}
                  onLabel="เปิด" 
                  offLabel="ปิด" 
                  onIcon="pi pi-check" 
                  offIcon="pi pi-times"
          />
        </div>

              <div>
                <label className="block mb-2">Slider: {sliderValue}</label>
                                <Slider 
                  value={sliderValue} 
                  onChange={(e) => setSliderValue(Array.isArray(e.value) ? e.value[0] : e.value)} 
            className="w-full"
          />
        </div>

              <div>
                <label className="block mb-2">Rating:</label>
                <Rating 
                  value={rating} 
                  onChange={(e) => setRating(e.value || 0)} 
                  stars={5}
                  cancel
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Data Components Section */}
        <Card title="📊 Data Components" className="mb-4">
          <div className="mb-4">
            <h4>DataTable</h4>
            <DataTable value={customers} paginator rows={5} responsiveLayout="scroll">
              <Column field="id" header="ID" sortable />
              <Column field="name" header="ชื่อ" sortable />
              <Column field="country" header="ประเทศ" sortable />
              <Column field="company" header="บริษัท" />
              <Column field="email" header="อีเมล" />
              <Column 
                header="การดำเนินการ" 
                body={(rowData) => (
                  <div className="flex gap-2">
                    <Button 
                      icon="pi pi-pencil" 
                      size="small" 
                      severity="info"
                      onClick={() => showToast('info', 'แก้ไข', `แก้ไข ${rowData.name}`)}
                    />
                    <Button 
                      icon="pi pi-trash" 
                      size="small" 
                      severity="danger"
                      onClick={() => showToast('error', 'ลบ', `ลบ ${rowData.name}`)}
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </Card>

        {/* Button Components Section */}
        <Card title="🎯 Button Components" className="mb-4">
          <div className="flex flex-column gap-4">
            <div>
              <h4>Button Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button label="Primary" />
                <Button label="Secondary" severity="secondary" />
                <Button label="Success" severity="success" />
                <Button label="Info" severity="info" />
                <Button label="Warning" severity="warning" />
                <Button label="Danger" severity="danger" />
                <Button label="Help" severity="help" />
              </div>
            </div>

            <div>
              <h4>Button Styles</h4>
              <div className="flex flex-wrap gap-3">
                <Button icon="pi pi-check" />
                <Button icon="pi pi-check" label="Icon + Text" />
                <Button label="Outlined" outlined />
                <Button label="Text" text />
                <Button label="Raised" raised />
                <Button label="Rounded" rounded />
              </div>
            </div>

            <div>
              <h4>Interactive Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <Button 
                  label="Show Dialog" 
                  icon="pi pi-external-link" 
                  onClick={() => setDialogVisible(true)} 
                />
        <Button
                  label="Show Success Toast" 
                  icon="pi pi-check" 
          severity="success"
                  onClick={() => showToast('success', 'สำเร็จ', 'การดำเนินการสำเร็จแล้ว')} 
                />
                <Button 
                  label="Show Error Toast" 
                  icon="pi pi-times" 
                  severity="danger"
                  onClick={() => showToast('error', 'ข้อผิดพลาด', 'เกิดข้อผิดพลาดบางอย่าง')} 
                />
              </div>
            </div>
          </div>
      </Card>

        {/* Panel Components Section */}
        <Card title="📋 Panel Components" className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel header="Panel Example" toggleable>
              <p>นี่คือเนื้อหาภายใน Panel ที่สามารถพับเก็บได้</p>
              <Button label="ปุ่มตัวอย่าง" icon="pi pi-check" size="small" />
            </Panel>

            <div>
              <h4 className="mb-3">Accordion Example</h4>
              <Accordion multiple activeIndex={[0]}>
                <AccordionTab header="ข้อมูลทั่วไป">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputText placeholder="ชื่อ" />
                    <InputText placeholder="นามสกุล" />
                  </div>
                </AccordionTab>
                <AccordionTab header="ที่อยู่">
                  <InputTextarea placeholder="ที่อยู่" rows={3} className="w-full" />
                </AccordionTab>
                <AccordionTab header="การติดต่อ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputText placeholder="เบอร์โทรศัพท์" />
                    <InputText placeholder="เบอร์มือถือ" />
                  </div>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
        </Card>

        {/* Display Components Section */}
        <Card title="🎨 Display Components" className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4>Progress</h4>
              <ProgressBar value={75} className="mb-3" />
              <p>Progress: 75%</p>
            </div>

            <div>
              <h4>Chips & Tags</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <Chip label="Apple" removable />
                <Chip label="Facebook" removable />
                <Chip label="Google" removable />
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag value="Primary" />
                <Tag severity="success" value="Success" />
                <Tag severity="info" value="Info" />
                <Tag severity="warning" value="Warning" />
                <Tag severity="danger" value="Danger" />
              </div>
            </div>

            <div>
              <h4>Badges</h4>
              <div className="flex gap-4 align-items-center">
                <Badge value="2" />
                <Badge value="8" severity="success" />
                <Badge value="4" severity="info" />
                <Badge value="12" severity="warning" />
                <Badge value="3" severity="danger" />
              </div>
            </div>
          </div>
        </Card>

        {/* Dialog */}
        <Dialog 
          header="Dialog Example" 
          visible={dialogVisible} 
          style={{ width: '50vw' }} 
          onHide={() => setDialogVisible(false)}
        >
          <div className="p-4">
            <p>นี่คือ Dialog ตัวอย่าง สำหรับ PrimeReact V10</p>
            <p>คุณสามารถใส่เนื้อหาใดก็ได้ภายใน Dialog</p>
            <div className="flex justify-content-end gap-2 mt-4">
              <Button label="ตกลง" onClick={() => setDialogVisible(false)} />
              <Button 
                label="ยกเลิก" 
                severity="secondary" 
                onClick={() => setDialogVisible(false)} 
              />
            </div>
          </div>
        </Dialog>

        <Divider />

        <div className="text-center mt-4 p-4">
          <h3 className="text-thai">🎉 PrimeReact V10 Demo Complete!</h3>
          <p className="text-thai">นี่คือตัวอย่างการใช้งาน PrimeReact Components หลักๆ ใน Version 10</p>
          <div className="flex justify-content-center gap-2 mt-3">
            <Button 
              label="เอกสาร PrimeReact" 
              icon="pi pi-external-link" 
              onClick={() => window.open('https://primereact.org/', '_blank')}
            />
            <Button 
              label="GitHub" 
              icon="pi pi-github" 
              severity="secondary"
              onClick={() => window.open('https://github.com/primefaces/primereact', '_blank')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App