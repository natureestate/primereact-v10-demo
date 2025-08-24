# 🎯 PrimeReact V10 Components Usage Guide

คู่มือการใช้งาน PrimeReact Components แบบละเอียด

## 📝 Form Components

### InputText
```typescript
import { InputText } from 'primereact/inputtext'

// Basic usage
<InputText 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
  placeholder="ข้อความ..."
/>

// With validation
<InputText 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
  className={`w-full ${hasError ? 'p-invalid' : ''}`}
  placeholder="จำเป็นต้องกรอก"
/>
```

### Password
```typescript
import { Password } from 'primereact/password'

<Password 
  value={password} 
  onChange={(e) => setPassword(e.target.value)} 
  toggleMask
  promptLabel="เลือกรหัสผ่าน"
  weakLabel="อ่อน"
  mediumLabel="ปานกลาง"
  strongLabel="แข็งแกร่ง"
/>
```

### Dropdown
```typescript
import { Dropdown } from 'primereact/dropdown'

const cities = [
  { name: 'กรุงเทพ', code: 'BKK' },
  { name: 'เชียงใหม่', code: 'CNX' }
]

<Dropdown 
  value={selectedCity} 
  onChange={(e) => setSelectedCity(e.value)} 
  options={cities} 
  optionLabel="name" 
  placeholder="เลือกเมือง"
  filter
  showClear
  filterBy="name"
/>
```

### MultiSelect
```typescript
import { MultiSelect } from 'primereact/multiselect'

<MultiSelect 
  value={selectedCountries} 
  onChange={(e) => setSelectedCountries(e.value)} 
  options={countries} 
  optionLabel="name" 
  placeholder="เลือกประเทศ"
  maxSelectedLabels={3}
  filter
  selectAll
/>
```

### Calendar
```typescript
import { Calendar } from 'primereact/calendar'

// Date picker
<Calendar 
  value={date} 
  onChange={(e) => setDate(e.value)} 
  dateFormat="dd/mm/yy"
  locale="th"
  showIcon
  showButtonBar
/>

// Date range
<Calendar 
  value={dates} 
  onChange={(e) => setDates(e.value)} 
  selectionMode="range" 
  dateFormat="dd/mm/yy"
  locale="th"
/>

// Time picker
<Calendar 
  value={time} 
  onChange={(e) => setTime(e.value)} 
  timeOnly
  hourFormat="24"
/>
```

## 📊 Data Components

### DataTable
```typescript
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'

// Advanced DataTable
<DataTable 
  value={customers} 
  paginator 
  rows={10}
  rowsPerPageOptions={[5, 10, 25]}
  responsiveLayout="scroll"
  selectionMode="multiple"
  selection={selectedCustomers}
  onSelectionChange={(e) => setSelectedCustomers(e.value)}
  globalFilter={globalFilter}
  header={header}
  emptyMessage="ไม่มีข้อมูล"
>
  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
  <Column field="name" header="ชื่อ" sortable filter filterPlaceholder="ค้นหาชื่อ" />
  <Column field="country" header="ประเทศ" sortable filter filterMatchMode={FilterMatchMode.CONTAINS} />
  <Column field="company" header="บริษัท" sortable />
  <Column 
    header="Actions" 
    body={(rowData) => (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" size="small" />
        <Button icon="pi pi-trash" size="small" severity="danger" />
      </div>
    )}
  />
</DataTable>
```

### Tree
```typescript
import { Tree } from 'primereact/tree'

const treeData = [
  {
    key: '0',
    label: 'Documents',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        icon: 'pi pi-fw pi-cog',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file' },
          { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file' }
        ]
      }
    ]
  }
]

<Tree 
  value={treeData} 
  selectionMode="checkbox" 
  selectionKeys={selectedKeys}
  onSelectionChange={(e) => setSelectedKeys(e.value)}
  filter
  filterMode="strict"
/>
```

## 🎯 Button & Menu Components

### Button Variants
```typescript
import { Button } from 'primereact/button'

// All severities
<Button label="Primary" />
<Button label="Secondary" severity="secondary" />
<Button label="Success" severity="success" />
<Button label="Info" severity="info" />
<Button label="Warning" severity="warning" />
<Button label="Danger" severity="danger" />
<Button label="Help" severity="help" />

// Styles
<Button label="Outlined" outlined />
<Button label="Text" text />
<Button label="Raised" raised />
<Button label="Rounded" rounded />

// Sizes
<Button label="Small" size="small" />
<Button label="Large" size="large" />

// Loading state
<Button label="Loading" loading={isLoading} />
```

### SplitButton
```typescript
import { SplitButton } from 'primereact/splitbutton'

const items = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { separator: true },
  { label: 'Export', icon: 'pi pi-external-link' }
]

<SplitButton 
  label="Save" 
  icon="pi pi-plus" 
  model={items} 
  onClick={save}
/>
```

### Menubar
```typescript
import { Menubar } from 'primereact/menubar'

const menuModel = [
  {
    label: 'File',
    icon: 'pi pi-fw pi-file',
    items: [
      { label: 'New', icon: 'pi pi-fw pi-plus' },
      { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
    items: [
      { label: 'Cut', icon: 'pi pi-fw pi-cut' },
      { label: 'Copy', icon: 'pi pi-fw pi-copy' }
    ]
  }
]

<Menubar 
  model={menuModel}
  start={<img alt="logo" src="logo.png" height="40" />}
  end={<Button label="Logout" icon="pi pi-power-off" />}
/>
```

## 📋 Panel Components

### Panel
```typescript
import { Panel } from 'primereact/panel'

<Panel 
  header="Panel Header" 
  toggleable 
  collapsed={panelCollapsed}
  onToggle={(e) => setPanelCollapsed(e.value)}
  headerTemplate={(options) => (
    <div className="flex align-items-center justify-content-between">
      <span className={options.titleClassName}>Custom Header</span>
      <Button 
        icon={options.collapsed ? 'pi pi-plus' : 'pi pi-minus'} 
        onClick={options.onTogglerClick} 
        text 
      />
    </div>
  )}
>
  <p>Panel content goes here.</p>
</Panel>
```

### Accordion
```typescript
import { Accordion, AccordionTab } from 'primereact/accordion'

<Accordion multiple activeIndex={[0, 1]}>
  <AccordionTab header="Header I" leftIcon="pi pi-calendar" rightIcon="pi pi-user">
    <p>First tab content</p>
  </AccordionTab>
  <AccordionTab header="Header II" leftIcon="pi pi-user" rightIcon="pi pi-cog">
    <p>Second tab content</p>
  </AccordionTab>
  <AccordionTab header="Header III" leftIcon="pi pi-search" rightIcon="pi pi-file" disabled>
    <p>Third tab content</p>
  </AccordionTab>
</Accordion>
```

### TabView
```typescript
import { TabView, TabPanel } from 'primereact/tabview'

<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
  <TabPanel header="Header I" leftIcon="pi pi-calendar">
    <p>First tab content</p>
  </TabPanel>
  <TabPanel header="Header II" leftIcon="pi pi-user">
    <p>Second tab content</p>
  </TabPanel>
  <TabPanel header="Header III" leftIcon="pi pi-search" disabled>
    <p>Third tab content</p>
  </TabPanel>
</TabView>
```

## 💬 Overlay Components

### Dialog
```typescript
import { Dialog } from 'primereact/dialog'

<Dialog 
  header="Dialog Header" 
  visible={visible} 
  style={{ width: '50vw' }}
  breakpoints={{ '960px': '75vw', '641px': '100vw' }}
  onHide={() => setVisible(false)}
  maximizable
  modal
  footer={
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} text />
      <Button label="Save" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
  }
>
  <p>Dialog content</p>
</Dialog>
```

### OverlayPanel
```typescript
import { OverlayPanel } from 'primereact/overlaypanel'

const op = useRef(null)

<Button 
  label="Toggle" 
  onClick={(e) => op.current.toggle(e)} 
/>
<OverlayPanel ref={op} style={{ width: '450px' }}>
  <div className="p-4">
    <h5>Overlay Panel Content</h5>
    <p>This is overlay panel content.</p>
  </div>
</OverlayPanel>
```

### Toast
```typescript
import { Toast } from 'primereact/toast'

const toast = useRef(null)

// Show different types of toasts
const showSuccess = () => {
  toast.current.show({
    severity: 'success', 
    summary: 'Success', 
    detail: 'Message Content', 
    life: 3000
  })
}

const showInfo = () => {
  toast.current.show({
    severity: 'info', 
    summary: 'Info', 
    detail: 'Message Content'
  })
}

const showWarn = () => {
  toast.current.show({
    severity: 'warn', 
    summary: 'Warning', 
    detail: 'Message Content'
  })
}

const showError = () => {
  toast.current.show({
    severity: 'error', 
    summary: 'Error', 
    detail: 'Message Content'
  })
}

<Toast ref={toast} />
```

## 🎨 Media & Display Components

### Image
```typescript
import { Image } from 'primereact/image'

<Image 
  src="image.jpg" 
  alt="Image" 
  width="250" 
  preview 
  imageStyle={{ borderRadius: '8px' }}
  imageClassName="shadow-4"
/>
```

### Carousel
```typescript
import { Carousel } from 'primereact/carousel'

const productTemplate = (product) => {
  return (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
      <img src={product.image} alt={product.name} className="w-6 shadow-2" />
      <div>
        <h4 className="mb-1">{product.name}</h4>
        <h6 className="mt-0 mb-3">${product.price}</h6>
        <Button label="Add to Cart" className="mt-2" />
      </div>
    </div>
  )
}

<Carousel 
  value={products} 
  numVisible={3} 
  numScroll={3} 
  responsiveOptions={responsiveOptions}
  itemTemplate={productTemplate} 
  header={<h2>Products</h2>}
/>
```

### Galleria
```typescript
import { Galleria } from 'primereact/galleria'

const itemTemplate = (item) => {
  return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
}

const thumbnailTemplate = (item) => {
  return <img src={item.thumbnailImageSrc} alt={item.alt} />
}

<Galleria 
  value={images} 
  responsiveOptions={responsiveOptions} 
  numVisible={5} 
  item={itemTemplate} 
  thumbnail={thumbnailTemplate}
  style={{ maxWidth: '640px' }}
/>
```

## 🛠️ Advanced Features

### Custom Hooks
```typescript
// useToast custom hook
import { useRef } from 'react'
import { Toast } from 'primereact/toast'

export const useToast = () => {
  const toast = useRef(null)

  const showToast = (severity, summary, detail, life = 3000) => {
    toast.current?.show({ severity, summary, detail, life })
  }

  const ToastComponent = () => <Toast ref={toast} />

  return { showToast, ToastComponent }
}
```

### Form Validation
```typescript
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required')
})

const formik = useFormik({
  initialValues: { name: '', email: '' },
  validationSchema,
  onSubmit: (values) => {
    console.log(values)
  }
})

<form onSubmit={formik.handleSubmit}>
  <div className="field">
    <label htmlFor="name">Name</label>
    <InputText 
      id="name"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      className={formik.errors.name ? 'p-invalid' : ''}
    />
    {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
  </div>
</form>
```

### Theming & Styling
```typescript
// Custom PT (PassThrough) styling
<Button 
  label="Custom Button"
  pt={{
    root: { 
      className: 'bg-purple-500 hover:bg-purple-600 border-purple-500 hover:border-purple-600' 
    },
    label: { 
      className: 'text-white font-bold' 
    }
  }}
/>

// Unstyled mode
<Button 
  unstyled
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  label="Tailwind Button"
/>
```

## 🔧 Configuration

### Global PrimeReact Config
```typescript
import PrimeReact from 'primereact/api'

// Configure globally
PrimeReact.ripple = true
PrimeReact.inputStyle = 'outlined'
PrimeReact.locale = 'th'
PrimeReact.zIndex = {
  modal: 1100,    // dialog, sidebar
  overlay: 1000,  // dropdown, overlaypanel
  menu: 1000,     // overlay menus
  tooltip: 1100   // tooltip
}

// Unstyled mode
PrimeReact.unstyled = true

// Custom PT options
PrimeReact.pt = {
  button: {
    root: { className: 'custom-button' }
  }
}
```

---

🎯 **นี่คือคู่มือการใช้งาน PrimeReact V10 Components แบบละเอียด สามารถนำไปปรับใช้ในโปรเจกต์ได้เลย!**
