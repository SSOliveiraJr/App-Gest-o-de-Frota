import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Users, 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  DollarSign, 
  Calendar, 
  Filter, 
  Download, 
  AlertCircle, 
  MapPin, 
  Navigation,
  Fuel,
  ChevronRight,
  User,
  Activity,
  CheckCircle,
  X,
  Layers
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtro Global por Placa do Cavalo (Trator)
  const [filterPlate, setFilterPlate] = useState('Todos');

  // Dados armazenados localmente (persistência no localStorage)
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Estados de Modais
  const [tripModal, setTripModal] = useState({ open: false, editingId: null });
  const [expenseModal, setExpenseModal] = useState({ open: false, editingId: null });
  const [fuelModal, setFuelModal] = useState({ open: false, editingId: null });
  const [driverModal, setDriverModal] = useState({ open: false, editingId: null });
  const [vehicleModal, setVehicleModal] = useState({ open: false, editingId: null });
  const [categoryModal, setCategoryModal] = useState({ open: false, editingId: null });

  // Modal Customizado para Confirmação de Exclusão (Evita alert/confirm nativo do browser)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null, title: '' });

  const [tripForm, setTripForm] = useState({
    date: '', plate: '', driverId: '', nf: '', cte: '', carrier: '',
    origin: '', destination: '', weight: '', driverFreight: '',
    advance: '', discount: '', tollVoucher: '', commissionPct: '10',
    advanceDate: '', balancePaymentDate: ''
  });

  const [expenseForm, setExpenseForm] = useState({
    date: '', description: '', category: 'Manutenção', plate: '', value: '',
    dueDate: '', paymentDate: '', installments: '1', cnpj: '', notes: ''
  });

  const [fuelForm, setFuelForm] = useState({
    date: '', plate: '', driverId: '', liters: '', pricePerLiter: '', odometer: '',
    invoiceNumber: '', accessKey: '', fuelType: 'Diesel S10', discount: '',
    hasSecondItem: false,
    fuelType2: 'Arla 32', liters2: '', pricePerLiter2: '', discount2: '',
    stationName: '', stationCnpj: ''
  });

  const [driverForm, setDriverForm] = useState({
    name: '', cpf: '', email: '', phone: ''
  });

  const [vehicleForm, setVehicleForm] = useState({
    horsePlate: '', trailerPlate: '', brandModel: '', status: 'Ativo'
  });

  const [categoryForm, setCategoryForm] = useState({
    name: ''
  });

  useEffect(() => {
    const savedDrivers = localStorage.getItem('fleet_drivers');
    const savedVehicles = localStorage.getItem('fleet_vehicles');
    const savedTrips = localStorage.getItem('fleet_trips');
    const savedExpenses = localStorage.getItem('fleet_expenses');
    const savedFuels = localStorage.getItem('fleet_fuels');
    const savedCategories = localStorage.getItem('fleet_categories');

    if (savedDrivers && savedVehicles && savedTrips && savedExpenses && savedFuels && savedCategories) {
      setDrivers(JSON.parse(savedDrivers));
      setVehicles(JSON.parse(savedVehicles));
      setTrips(JSON.parse(savedTrips));
      setExpenses(JSON.parse(savedExpenses));
      setFuels(JSON.parse(savedFuels));
      setCategories(JSON.parse(savedCategories));
    } else {
      // Dados simulados em contexto do Brasil para demonstração imediata
      const mockDrivers = [
        { id: 'd1', name: 'Marcos Vinícius Silva', cpf: '123.456.789-00', email: 'marcos.silva@trans.com.br', phone: '(11) 98888-7777' },
        { id: 'd2', name: 'Adalberto Ramos', cpf: '234.567.890-11', email: 'adalberto.ramos@trans.com.br', phone: '(21) 97777-6666' },
        { id: 'd3', name: 'Cláudio Sousa', cpf: '345.678.901-22', email: 'claudio.sousa@trans.com.br', phone: '(47) 96666-5555' }
      ];

      const mockVehicles = [
        { id: 'v1', horsePlate: 'ABC-1234', trailerPlate: 'XYZ-5678', brandModel: 'Scania R450', status: 'Ativo' },
        { id: 'v2', horsePlate: 'DEF-5678', trailerPlate: 'UVW-1234', brandModel: 'Volvo FH 540', status: 'Ativo' },
        { id: 'v3', horsePlate: 'GHI-9012', trailerPlate: 'LMN-4321', brandModel: 'Mercedes-Benz Actros', status: 'Em Manutenção' }
      ];

      const mockTrips = [
        {
          id: 't1', date: '2026-06-10', plate: 'ABC-1234', driverId: 'd1', nf: '98451', cte: '22301',
          carrier: 'Logística Express', origin: 'Santos-SP', destination: 'Cuiabá-MT', weight: 32000,
          driverFreight: 12500, advance: 3000, discount: 250, tollVoucher: 1200, commissionPct: 12,
          advanceDate: '2026-06-10', balancePaymentDate: '2026-06-15'
        },
        {
          id: 't2', date: '2026-06-14', plate: 'DEF-5678', driverId: 'd2', nf: '98503', cte: '22340',
          carrier: 'Supermercados do Sul', origin: 'Porto Alegre-RS', destination: 'São Paulo-SP', weight: 28000,
          driverFreight: 9800, advance: 2000, discount: 100, tollVoucher: 900, commissionPct: 10,
          advanceDate: '2026-06-14', balancePaymentDate: ''
        },
        {
          id: 't3', date: '2026-06-18', plate: 'ABC-1234', driverId: 'd1', nf: '98610', cte: '22415',
          carrier: 'Grãos Brasil', origin: 'Rondonópolis-MT', destination: 'Paranaguá-PR', weight: 34500,
          driverFreight: 14200, advance: 4000, discount: 300, tollVoucher: 1400, commissionPct: 12,
          advanceDate: '2026-06-18', balancePaymentDate: '2026-06-22'
        }
      ];

      const mockExpenses = [
        { id: 'e1', date: '2026-06-11', description: 'Troca de Óleo e Filtros', category: 'Manutenção', plate: 'ABC-1234', value: 1850, dueDate: '2026-06-11', paymentDate: '2026-06-11', installments: 1, cnpj: '12.345.678/0001-90', notes: 'Troca preventiva na oficina' },
        { id: 'e2', date: '2026-06-13', description: 'Pedágio avulso retorno', category: 'Pedágio', plate: 'DEF-5678', value: 180, dueDate: '2026-06-13', paymentDate: '2026-06-13', installments: 1, cnpj: '', notes: 'Pago em dinheiro' },
        { id: 'e3', date: '2026-06-15', description: 'Conserto de pneu furado', category: 'Manutenção', plate: 'GHI-9012', value: 350, dueDate: '2026-06-15', paymentDate: '', installments: 1, cnpj: '98.765.432/0001-10', notes: 'Borracharia da rodovia BR-116' }
      ];

      const mockFuels = [
        { 
          id: 'f1', date: '2026-06-11', plate: 'ABC-1234', driverId: 'd1', odometer: 124500, invoiceNumber: '11054', 
          accessKey: '35260612345678000199550010000110541001234567', fuelType: 'Diesel S10', liters: 410, pricePerLiter: 5.85, discount: 15,
          hasSecondItem: true, fuelType2: 'Arla 32', liters2: 40, pricePerLiter2: 3.50, discount2: 0,
          stationName: 'Posto Graal Petropen', stationCnpj: '12.345.678/0001-90'
        },
        { 
          id: 'f2', date: '2026-06-15', plate: 'DEF-5678', driverId: 'd2', odometer: 88400, invoiceNumber: '11055', 
          accessKey: '35260687654321000199550010000110551008765432', fuelType: 'Diesel S500', liters: 320, pricePerLiter: 5.90, discount: 0,
          hasSecondItem: false, fuelType2: 'Arla 32', liters2: '', pricePerLiter2: '', discount2: '',
          stationName: 'Auto Posto Sakamoto', stationCnpj: '98.765.432/0001-10'
        }
      ];

      const mockCategories = [
        { id: 'c1', name: 'Manutenção' },
        { id: 'c2', name: 'Pedágio' },
        { id: 'c3', name: 'Taxas / Impostos' },
        { id: 'c4', name: 'Alimentação' },
        { id: 'c5', name: 'Pneus' },
        { id: 'c6', name: 'Outros' }
      ];

      setDrivers(mockDrivers);
      setVehicles(mockVehicles);
      setTrips(mockTrips);
      setExpenses(mockExpenses);
      setFuels(mockFuels);
      setCategories(mockCategories);

      localStorage.setItem('fleet_drivers', JSON.stringify(mockDrivers));
      localStorage.setItem('fleet_vehicles', JSON.stringify(mockVehicles));
      localStorage.setItem('fleet_trips', JSON.stringify(mockTrips));
      localStorage.setItem('fleet_expenses', JSON.stringify(mockExpenses));
      localStorage.setItem('fleet_fuels', JSON.stringify(mockFuels));
      localStorage.setItem('fleet_categories', JSON.stringify(mockCategories));
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) localStorage.setItem('fleet_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (drivers.length > 0) localStorage.setItem('fleet_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    if (vehicles.length > 0) localStorage.setItem('fleet_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    if (trips.length > 0) localStorage.setItem('fleet_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    if (expenses.length > 0) localStorage.setItem('fleet_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (fuels.length > 0) localStorage.setItem('fleet_fuels', JSON.stringify(fuels));
  }, [fuels]);


  const filteredTrips = filterPlate === 'Todos' 
    ? trips 
    : trips.filter(t => t.plate === filterPlate);

  const filteredExpenses = filterPlate === 'Todos' 
    ? expenses 
    : expenses.filter(e => e.plate === filterPlate || e.plate === 'Todos');

  const filteredFuels = filterPlate === 'Todos' 
    ? fuels 
    : fuels.filter(f => f.plate === filterPlate);


  const totalRevenue = filteredTrips.reduce((acc, curr) => acc + Number(curr.driverFreight), 0);
  const totalExpensesDirect = filteredExpenses.reduce((acc, curr) => acc + Number(curr.value), 0);
  
  // Abastecimentos calculados somando Item 1 + Item 2 (subtraindo os respectivos descontos)
  const totalFuelCost = filteredFuels.reduce((acc, curr) => {
    const mainCost = (Number(curr.liters) * Number(curr.pricePerLiter)) - Number(curr.discount || 0);
    const secondCost = curr.hasSecondItem 
      ? (Number(curr.liters2) * Number(curr.pricePerLiter2)) - Number(curr.discount2 || 0)
      : 0;
    return acc + mainCost + secondCost;
  }, 0);
  
  const totalCommissionPaid = filteredTrips.reduce((acc, curr) => {
    const pct = Number(curr.commissionPct) || 0;
    const freight = Number(curr.driverFreight) || 0;
    return acc + (freight * (pct / 100));
  }, 0);

  const totalExpenses = totalExpensesDirect + totalFuelCost + totalCommissionPaid;
  const netProfit = totalRevenue - totalExpenses;
  const netMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const getDriverName = (id) => {
    const driver = drivers.find(d => d.id === id);
    return driver ? driver.name : 'Desconhecido';
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();
    const formattedTrip = {
      ...tripForm,
      weight: Number(tripForm.weight),
      driverFreight: Number(tripForm.driverFreight),
      advance: Number(tripForm.advance),
      discount: Number(tripForm.discount),
      tollVoucher: Number(tripForm.tollVoucher),
      commissionPct: Number(tripForm.commissionPct),
      advanceDate: tripForm.advanceDate || '',
      balancePaymentDate: tripForm.balancePaymentDate || ''
    };

    if (tripModal.editingId) {
      setTrips(trips.map(t => t.id === tripModal.editingId ? { ...t, ...formattedTrip, id: t.id } : t));
    } else {
      const newTrip = {
        ...formattedTrip,
        id: 't_' + Date.now()
      };
      setTrips([newTrip, ...trips]);
    }
    setTripModal({ open: false, editingId: null });
    setTripForm({
      date: '', plate: '', driverId: '', nf: '', cte: '', carrier: '',
      origin: '', destination: '', weight: '', driverFreight: '',
      advance: '', discount: '', tollVoucher: '', commissionPct: '10',
      advanceDate: '', balancePaymentDate: ''
    });
  };

  const handleEditTrip = (trip) => {
    setTripForm({ 
      ...trip,
      advanceDate: trip.advanceDate || '',
      balancePaymentDate: trip.balancePaymentDate || ''
    });
    setTripModal({ open: true, editingId: trip.id });
  };

  const triggerDelete = (type, id, title) => {
    setDeleteConfirm({ open: true, type, id, title });
  };

  const executeDelete = () => {
    const { type, id } = deleteConfirm;
    let updated;
    if (type === 'trip') {
      updated = trips.filter(t => t.id !== id);
      setTrips(updated);
      localStorage.setItem('fleet_trips', JSON.stringify(updated));
    } else if (type === 'expense') {
      updated = expenses.filter(e => e.id !== id);
      setExpenses(updated);
      localStorage.setItem('fleet_expenses', JSON.stringify(updated));
    } else if (type === 'fuel') {
      updated = fuels.filter(f => f.id !== id);
      setFuels(updated);
      localStorage.setItem('fleet_fuels', JSON.stringify(updated));
    } else if (type === 'driver') {
      updated = drivers.filter(d => d.id !== id);
      setDrivers(updated);
      localStorage.setItem('fleet_drivers', JSON.stringify(updated));
    } else if (type === 'vehicle') {
      updated = vehicles.filter(v => v.id !== id);
      setVehicles(updated);
      localStorage.setItem('fleet_vehicles', JSON.stringify(updated));
    } else if (type === 'category') {
      updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      localStorage.setItem('fleet_categories', JSON.stringify(updated));
    }
    setDeleteConfirm({ open: false, type: '', id: null, title: '' });
  };

  const handleSaveExpense = (e) => {
    e.preventDefault();
    const formattedExpense = {
      ...expenseForm,
      value: Number(expenseForm.value),
      installments: Number(expenseForm.installments || 1),
      dueDate: expenseForm.dueDate || '',
      paymentDate: expenseForm.paymentDate || '',
      cnpj: expenseForm.cnpj || '',
      notes: expenseForm.notes || ''
    };

    if (expenseModal.editingId) {
      setExpenses(expenses.map(exp => exp.id === expenseModal.editingId ? { ...exp, ...formattedExpense, id: exp.id } : exp));
    } else {
      const newExp = {
        ...formattedExpense,
        id: 'e_' + Date.now()
      };
      setExpenses([newExp, ...expenses]);
    }
    setExpenseModal({ open: false, editingId: null });
    setExpenseForm({ 
      date: new Date().toISOString().split('T')[0], 
      description: '', 
      category: 'Manutenção', 
      plate: vehicles[0]?.horsePlate || 'Todos', 
      value: '',
      dueDate: '',
      paymentDate: '',
      installments: '1',
      cnpj: '',
      notes: ''
    });
  };

  const handleEditExpense = (expense) => {
    setExpenseForm({ 
      ...expense,
      dueDate: expense.dueDate || '',
      paymentDate: expense.paymentDate || '',
      installments: expense.installments || '1',
      cnpj: expense.cnpj || '',
      notes: expense.notes || ''
    });
    setExpenseModal({ open: true, editingId: expense.id });
  };

  const handleSaveFuel = (e) => {
    e.preventDefault();
    const formattedFuel = {
      ...fuelForm,
      liters: Number(fuelForm.liters),
      pricePerLiter: Number(fuelForm.pricePerLiter),
      odometer: Number(fuelForm.odometer),
      discount: Number(fuelForm.discount || 0),
      hasSecondItem: fuelForm.hasSecondItem,
      fuelType2: fuelForm.hasSecondItem ? fuelForm.fuelType2 : '',
      liters2: fuelForm.hasSecondItem ? Number(fuelForm.liters2) : '',
      pricePerLiter2: fuelForm.hasSecondItem ? Number(fuelForm.pricePerLiter2) : '',
      discount2: fuelForm.hasSecondItem ? Number(fuelForm.discount2 || 0) : '',
      stationName: fuelForm.stationName || '',
      stationCnpj: fuelForm.stationCnpj || ''
    };

    if (fuelModal.editingId) {
      setFuels(fuels.map(f => f.id === fuelModal.editingId ? { ...formattedFuel, id: f.id } : f));
    } else {
      const newFuel = {
        ...formattedFuel,
        id: 'f_' + Date.now()
      };
      setFuels([newFuel, ...fuels]);
    }
    setFuelModal({ open: false, editingId: null });
    setFuelForm({ 
      date: new Date().toISOString().split('T')[0], 
      plate: vehicles[0]?.horsePlate || '', 
      driverId: drivers[0]?.id || '', 
      liters: '', 
      pricePerLiter: '', 
      odometer: '',
      invoiceNumber: '', 
      accessKey: '', 
      fuelType: 'Diesel S10', 
      discount: '',
      hasSecondItem: false,
      fuelType2: 'Arla 32',
      liters2: '',
      pricePerLiter2: '',
      discount2: '',
      stationName: '',
      stationCnpj: ''
    });
  };

  const handleEditFuel = (fuel) => {
    setFuelForm({ 
      ...fuel,
      invoiceNumber: fuel.invoiceNumber || '',
      accessKey: fuel.accessKey || '',
      fuelType: fuel.fuelType || 'Diesel S10',
      discount: fuel.discount || '',
      hasSecondItem: fuel.hasSecondItem || false,
      fuelType2: fuel.fuelType2 || 'Arla 32',
      liters2: fuel.liters2 || '',
      pricePerLiter2: fuel.pricePerLiter2 || '',
      discount2: fuel.discount2 || '',
      stationName: fuel.stationName || '',
      stationCnpj: fuel.stationCnpj || ''
    });
    setFuelModal({ open: true, editingId: fuel.id });
  };

  const handleSaveDriver = (e) => {
    e.preventDefault();
    if (driverModal.editingId) {
      setDrivers(drivers.map(d => d.id === driverModal.editingId ? { ...d, ...driverForm, id: d.id } : d));
    } else {
      const newDriver = {
        ...driverForm,
        id: 'd_' + Date.now()
      };
      setDrivers([...drivers, newDriver]);
    }
    setDriverModal({ open: false, editingId: null });
    setDriverForm({ name: '', cpf: '', email: '', phone: '' });
  };

  const handleEditDriver = (driver) => {
    setDriverForm({ ...driver });
    setDriverModal({ open: true, editingId: driver.id });
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    if (vehicleModal.editingId) {
      setVehicles(vehicles.map(v => v.id === vehicleModal.editingId ? { ...v, ...vehicleForm, id: v.id } : v));
    } else {
      const newVehicle = {
        ...vehicleForm,
        id: 'v_' + Date.now()
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setVehicleModal({ open: false, editingId: null });
    setVehicleForm({ horsePlate: '', trailerPlate: '', brandModel: '', status: 'Ativo' });
  };

  const handleEditVehicle = (vehicle) => {
    setVehicleForm({ ...vehicle });
    setVehicleModal({ open: true, editingId: vehicle.id });
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (categoryModal.editingId) {
      setCategories(categories.map(c => c.id === categoryModal.editingId ? { ...c, ...categoryForm, id: c.id } : c));
    } else {
      const newCategory = {
        ...categoryForm,
        id: 'c_' + Date.now()
      };
      setCategories([...categories, newCategory]);
    }
    setCategoryModal({ open: false, editingId: null });
    setCategoryForm({ name: '' });
  };

  const handleEditCategory = (category) => {
    setCategoryForm({ ...category });
    setCategoryModal({ open: true, editingId: category.id });
  };

  // Moeda: Real Brasileiro (R$)
  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
  };

  // Formato de Data: dd/mm/aaaa
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const formatKg = (val) => {
    return new Intl.NumberFormat('pt-BR').format(val || 0) + ' kg';
  };

  const formatPlate = (plate) => {
    return plate ? plate.toUpperCase() : 'N/A';
  };

  const getTabLabel = (tab) => {
    switch(tab) {
      case 'dashboard': return 'Painel Geral';
      case 'trips': return 'Receitas';
      case 'expenses': return 'Despesas Gerais';
      case 'fuels': return 'Abastecimentos';
      case 'drivers': return 'Motoristas';
      case 'vehicles': return 'Veículos';
      case 'categories': return 'Categorias de Despesas';
      default: return tab;
    }
  };

  const handleExportCSV = (type) => {
    let headers = [];
    let rows = [];
    let filename = '';

    if (type === 'trips') {
      headers = [
        'Data Viagem', 'Placa', 'Motorista', 'NF', 'CT-e', 'Transportadora', 'Origem', 'Destino', 
        'Peso', 'Valor Frete', 'Adiantamento', 'Data Pgto Adiantamento', 'Pedagio', 'Descontos', 
        'Saldo', 'Data Pgto Saldo', 'Comissão', 'Saldo Final'
      ];
      rows = filteredTrips.map(t => [
        formatDate(t.date), t.plate, getDriverName(t.driverId), t.nf, t.cte, t.carrier, t.origin, t.destination, 
        t.weight, t.driverFreight, t.advance, formatDate(t.advanceDate), t.tollVoucher || 0, t.discount, 
        (t.driverFreight - t.advance - t.discount + (Number(t.tollVoucher) || 0)), formatDate(t.balancePaymentDate), 
        (t.driverFreight * t.commissionPct/100), (t.driverFreight - t.advance - t.discount + (Number(t.tollVoucher) || 0))
      ]);
      filename = 'viagens_receitas.csv';
    } else if (type === 'expenses') {
      headers = ['Data Lançamento', 'Descricao', 'Categoria', 'Placa', 'Valor', 'Vencimento', 'Pagamento', 'Parcelas', 'CNPJ', 'Observações'];
      rows = filteredExpenses.map(e => [
        formatDate(e.date), 
        e.description, 
        e.category, 
        e.plate, 
        e.value,
        formatDate(e.dueDate),
        formatDate(e.paymentDate),
        e.installments || 1,
        e.cnpj || '',
        e.notes || ''
      ]);
      filename = 'despesas_operacionais.csv';
    } else if (type === 'fuels') {
      headers = ['Data', 'Placa', 'Motorista', 'Posto', 'CNPJ Posto', 'Combustivel 1', 'Litros 1', 'PrecoLitro 1', 'Desconto 1', 'Combustivel 2', 'Litros 2', 'PrecoLitro 2', 'Desconto 2', 'NF', 'ChaveAcesso', 'Total'];
      rows = filteredFuels.map(f => [
        formatDate(f.date), 
        f.plate, 
        getDriverName(f.driverId), 
        f.stationName || '',
        f.stationCnpj || '',
        f.fuelType || 'Diesel S10', 
        f.liters, 
        f.pricePerLiter, 
        f.discount || 0,
        f.hasSecondItem ? f.fuelType2 : 'N/A',
        f.hasSecondItem ? f.liters2 : 0,
        f.hasSecondItem ? f.pricePerLiter2 : 0,
        f.hasSecondItem ? f.discount2 : 0,
        f.invoiceNumber || '',
        f.accessKey || '',
        ((f.liters * f.pricePerLiter) - (f.discount || 0)) + (f.hasSecondItem ? ((f.liters2 * f.pricePerLiter2) - (f.discount2 || 0)) : 0)
      ]);
      filename = 'abastecimentos.csv';
    } else {
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maskCnpj = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row antialiased">
      
      {/* --- SIDEBAR LATERAL --- */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/85 flex flex-col shrink-0">
        
        {/* LOGO */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Truck size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">LogiFleet</h1>
            <p className="text-xs text-slate-400 font-medium">Gestão de Frotas</p>
          </div>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-2">Visão Geral</p>
          <button 
            onClick={() => { setCurrentTab('dashboard'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} />
            <span>Painel Geral</span>
          </button>

          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 pt-4 mb-2">Operacional</p>
          <button 
            onClick={() => { setCurrentTab('trips'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'trips' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <TrendingUp size={18} />
            <span>Receitas</span>
          </button>

          <button 
            onClick={() => { setCurrentTab('expenses'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'expenses' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <TrendingDown size={18} />
            <span>Despesas Gerais</span>
          </button>

          <button 
            onClick={() => { setCurrentTab('fuels'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'fuels' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <Fuel size={18} />
            <span>Abastecimentos</span>
          </button>

          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3 pt-4 mb-2">Cadastros</p>
          <button 
            onClick={() => { setCurrentTab('drivers'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'drivers' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <Users size={18} />
            <span>Motoristas</span>
          </button>

          <button 
            onClick={() => { setCurrentTab('vehicles'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'vehicles' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <Truck size={18} />
            <span>Veículos (Cavalos/Carretas)</span>
          </button>

          <button 
            onClick={() => { setCurrentTab('categories'); setSearchTerm(''); }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${currentTab === 'categories' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
          >
            <Layers size={18} />
            <span>Cat. de Despesas</span>
          </button>
        </nav>

        {/* PROFILE RESUMIDO */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">Administrador</p>
              <p className="text-[10px] text-slate-400">Frota Própria</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR / HEADER (Com Filtro por Placa do Cavalo) */}
        <header className="min-h-16 bg-white border-b border-slate-200/85 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <span className="text-sm font-semibold text-slate-500 capitalize">{getTabLabel(currentTab)}</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Gerenciando {vehicles.length} veículos ativos</span>
          </div>

          {/* ÁREA DE FILTRAGEM DE PLACA DO CAVALOS (SELETOR GLOBAL) */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            
            {/* SELETOR EXPLICITO DE PLACA DO CAVALO */}
            <div className="flex items-center space-x-2 bg-slate-100/90 px-3 py-2 rounded-xl text-xs w-full sm:w-auto shadow-inner">
              <Filter size={14} className="text-indigo-600 font-bold" />
              <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Filtrar Cavalo (Placa):</span>
              <select 
                value={filterPlate} 
                onChange={(e) => setFilterPlate(e.target.value)}
                className="bg-transparent font-black text-indigo-700 border-none outline-none focus:ring-0 cursor-pointer pr-4"
              >
                <option value="Todos">Toda a Frota</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.horsePlate}>Placa: {v.horsePlate}</option>
                ))}
              </select>
            </div>

            {/* BARRA DE PESQUISA (Não visível no Painel Geral) */}
            {currentTab !== 'dashboard' && (
              <div className="relative w-full sm:w-48">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisa rápida..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-xs font-semibold rounded-xl pl-9 pr-4 py-2 border-none ring-1 ring-transparent focus:ring-indigo-600 outline-none w-full transition-all"
                />
              </div>
            )}
          </div>
        </header>

        {/* CONTAINER DO CONTEÚDO PRINCIPAL */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">

          {/* BANNER DE INFORMAÇÃO DO FILTRO OPERANTE */}
          {filterPlate !== 'Todos' && (
            <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-indigo-800 font-semibold">
                <AlertCircle size={16} className="text-indigo-600" />
                <span>
                  O painel e as listagens estão apresentando apenas dados relativos ao veículo com Placa <strong>{filterPlate}</strong>.
                </span>
              </div>
              <button 
                onClick={() => setFilterPlate('Todos')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
              >
                <span>Limpar filtro</span>
                <X size={14} />
              </button>
            </div>
          )}

          {}
          {/* ======================= TAB: DASHBOARD (RECALCULADO DINAMICAMENTE EM R$) ======================= */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* INDICADORES PRINCIPAIS DE DESEMPENHO (KPINs) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* FATURAMENTO */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Faturamento (Fretes)</span>
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><TrendingUp size={16} /></span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{formatBRL(totalRevenue)}</h3>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                    +{filteredTrips.length} viagens registradas
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
                </div>

                {/* DESPESAS GERAIS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Despesas Operacionais</span>
                    <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><TrendingDown size={16} /></span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{formatBRL(totalExpensesDirect)}</h3>
                  <p className="text-xs text-rose-600 font-semibold mt-1">
                    Manutenções gerais e seguros
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"></div>
                </div>

                {/* ABASTECIMENTOS SUBTRAINDO DESCONTOS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Abastecimento (Diesel/Arla)</span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600"><Fuel size={16} /></span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{formatBRL(totalFuelCost)}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {filteredFuels.reduce((acc, curr) => acc + Number(curr.liters) + (curr.hasSecondItem ? Number(curr.liters2) : 0), 0)} L consumidos
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
                </div>

                {/* COMISSÕES PAGAS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Comissões de Motorista</span>
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><Users size={16} /></span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{formatBRL(totalCommissionPaid)}</h3>
                  <p className="text-xs text-indigo-500 font-semibold mt-1">
                    Acertos calculados
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"></div>
                </div>

                {/* RESULTADO LÍQUIDO */}
                <div className={`bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden ${netProfit < 0 ? 'bg-red-50/20' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Resultado Líquido</span>
                    <span className={`p-1.5 rounded-lg ${netProfit >= 0 ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                      <Activity size={16} />
                    </span>
                  </div>
                  <h3 className={`text-2xl font-black ${netProfit >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
                    {formatBRL(netProfit)}
                  </h3>
                  <p className={`text-xs font-bold mt-1 ${netProfit >= 0 ? 'text-teal-600' : 'text-red-500'}`}>
                    Margem: {netMargin.toFixed(1)}%
                  </p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${netProfit >= 0 ? 'bg-teal-500' : 'bg-red-500'}`}></div>
                </div>

              </div>

              {/* GRÁFICOS DINÂMICOS SENSÍVEIS AO FILTRO DE PLACA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gráfico Comparativo de Faturamento x Custos */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-800">Balanço Financeiro do Veículo</h4>
                      <p className="text-xs text-slate-400">
                        {filterPlate === 'Todos' ? 'Média Geral de todos os Veículos' : `Métricas exclusivas de ${filterPlate}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-indigo-600"></span>
                        <span className="text-slate-500">Receita</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded bg-rose-500"></span>
                        <span className="text-slate-500">Despesa Total</span>
                      </span>
                    </div>
                  </div>

                  {/* Representação SVG do Gráfico Adaptativo */}
                  <div className="w-full h-48 bg-slate-50/50 rounded-xl relative p-4 flex items-end justify-around">
                    <div className="absolute left-0 right-0 top-1/4 border-t border-slate-200/50"></div>
                    <div className="absolute left-0 right-0 top-1/2 border-t border-slate-200/50"></div>
                    <div className="absolute left-0 right-0 top-3/4 border-t border-slate-200/50"></div>

                    {/* Mês Anterior (Simulado) */}
                    <div className="flex flex-col items-center space-y-2 z-10 w-16">
                      <div className="flex space-x-1 items-end h-32">
                        <div className="w-5 bg-indigo-400/80 rounded-t h-20" title="Receita anterior"></div>
                        <div className="w-5 bg-rose-400/80 rounded-t h-14" title="Despesa anterior"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Mês Passado</span>
                    </div>

                    {/* Mês Vigente (Real baseado nas transações filtradas do veículo) */}
                    <div className="flex flex-col items-center space-y-2 z-10 w-16">
                      <div className="flex space-x-1 items-end h-32">
                        <div 
                          className="w-6 bg-indigo-600 rounded-t shadow transition-all duration-500" 
                          style={{ height: totalRevenue > 0 ? '110px' : '4px' }}
                          title={`Receita real: ${formatBRL(totalRevenue)}`}
                        ></div>
                        <div 
                          className="w-6 bg-rose-500 rounded-t shadow transition-all duration-500" 
                          style={{ height: totalExpenses > 0 ? (totalExpenses >= totalRevenue ? '120px' : '80px') : '4px' }}
                          title={`Despesa real: ${formatBRL(totalExpenses)}`}
                        ></div>
                      </div>
                      <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Mês Atual</span>
                    </div>

                  </div>
                </div>

                {/* Composição de Custos do Veículo */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-800">Centro de Gasto</h4>
                    <p className="text-xs text-slate-400">Distribuição financeira em Reais (R$)</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Combustível */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                        <span>Combustível (Líquido)</span>
                        <span>{formatBRL(totalFuelCost)} ({totalExpenses > 0 ? ((totalFuelCost/totalExpenses)*100).toFixed(0) : 0}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${totalExpenses > 0 ? (totalFuelCost/totalExpenses)*100 : 0}%` }}></div>
                      </div>
                    </div>

                    {/* Comissões de Condutores */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                        <span>Comissões de Motoristas</span>
                        <span>{formatBRL(totalCommissionPaid)} ({totalExpenses > 0 ? ((totalCommissionPaid/totalExpenses)*100).toFixed(0) : 0}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${totalExpenses > 0 ? (totalCommissionPaid/totalExpenses)*100 : 0}%` }}></div>
                      </div>
                    </div>

                    {/* Manutenções Associadas */}
                    {(() => {
                      const maintCost = filteredExpenses.filter(e => e.category === 'Manutenção').reduce((a, b) => a + Number(b.value), 0);
                      const pct = totalExpenses > 0 ? ((maintCost/totalExpenses)*100).toFixed(0) : 0;
                      return (
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                            <span>Manutenção</span>
                            <span>{formatBRL(maintCost)} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Outros Gastos */}
                    {(() => {
                      const othersCost = filteredExpenses.filter(e => e.category !== 'Manutenção').reduce((a, b) => a + Number(b.value), 0);
                      const pct = totalExpenses > 0 ? ((othersCost/totalExpenses)*100).toFixed(0) : 0;
                      return (
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                            <span>Outros</span>
                            <span>{formatBRL(othersCost)} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

              </div>

              {/* LISTAGENS OPERACIONAIS COMPACTAS FILTRADAS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Histórico Recente de Rotas do Veículo */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-800">Histórico de Viagens</h4>
                      <p className="text-xs text-slate-400">Últimos registros formatados em DD/MM/AAAA</p>
                    </div>
                    <button 
                      onClick={() => setCurrentTab('trips')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                    >
                      <span>Ver todas</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                          <th className="pb-3">Data</th>
                          <th className="pb-3">Placa / Motorista</th>
                          <th className="pb-3">Percurso</th>
                          <th className="pb-3">Carga</th>
                          <th className="pb-3 text-right">Frete Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs">
                        {filteredTrips.slice(0, 3).map((trip) => (
                          <tr key={trip.id} className="hover:bg-slate-50/50 transition">
                            <td className="py-3 font-semibold text-slate-500 whitespace-nowrap">{formatDate(trip.date)}</td>
                            <td className="py-3">
                              <div className="font-bold text-slate-800">{formatPlate(trip.plate)}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{getDriverName(trip.driverId)}</div>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center space-x-1 text-slate-600 font-semibold">
                                <span>{trip.origin}</span>
                                <span className="text-slate-300">→</span>
                                <span>{trip.destination}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">{trip.carrier}</div>
                            </td>
                            <td className="py-3 text-slate-600 font-medium">{formatKg(trip.weight)}</td>
                            <td className="py-3 text-right font-bold text-slate-800">{formatBRL(trip.driverFreight)}</td>
                          </tr>
                        ))}
                        {filteredTrips.length === 0 && (
                          <tr>
                            <td colSpan="5" className="py-6 text-center text-slate-400">Nenhuma viagem encontrada para este veículo.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Status Geral de Todos os Equipamentos */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-800">Frota sob Supervisão</h4>
                      <p className="text-xs text-slate-400">Estado operacional de cada conjunto</p>
                    </div>
                    <button 
                      onClick={() => setCurrentTab('vehicles')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                    >
                      <span>Gerenciar</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {vehicles.map((v) => (
                      <div 
                        key={v.id} 
                        onClick={() => setFilterPlate(v.horsePlate)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${v.horsePlate === filterPlate ? 'border-indigo-200 bg-indigo-50/40 shadow-sm' : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${v.horsePlate === filterPlate ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                            <Truck size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-800">{formatPlate(v.horsePlate)} / {formatPlate(v.trailerPlate)}</p>
                            <p className="text-[10px] text-slate-400">{v.brandModel}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase ${v.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {v.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {}
          {/* ======================= TAB: VIAGENS (RECEITAS FILTRADAS EM R$) ======================= */}
          {currentTab === 'trips' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Controle de Receitas (Viagens)</h2>
                  <p className="text-slate-500 text-xs">Administre as receitas brutas de frete, adiantamentos e vale-pedágios.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleExportCSV('trips')}
                    className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition"
                  >
                    <Download size={14} />
                    <span>Exportar CSV</span>
                  </button>
                  <button 
                    onClick={() => {
                      setTripForm({
                        date: new Date().toISOString().split('T')[0], plate: vehicles[0]?.horsePlate || '', driverId: drivers[0]?.id || '',
                        nf: '', cte: '', carrier: '', origin: '', destination: '', weight: '',
                        driverFreight: '', advance: '', discount: '', tollVoucher: '', commissionPct: '10',
                        advanceDate: '', balancePaymentDate: ''
                      });
                      setTripModal({ open: true, editingId: null });
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                  >
                    <Plus size={14} />
                    <span>Nova Viagem</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200/85 text-[10px] font-black text-slate-400 tracking-wider uppercase">
                        <th className="py-4 px-6">Data</th>
                        <th className="py-4 px-4">Placa do Cavalo</th>
                        <th className="py-4 px-4">Motorista / Rota</th>
                        <th className="py-4 px-4">Peso</th>
                        <th className="py-4 px-4">Valor Frete</th>
                        <th className="py-4 px-4">Adiantamento</th>
                        <th className="py-4 px-4">Comissão</th>
                        <th className="py-4 px-4 text-right">Saldo Final</th>
                        <th className="py-4 px-6 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredTrips
                        .filter(t => 
                          t.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.nf.includes(searchTerm) ||
                          t.cte.includes(searchTerm)
                        )
                        .map((trip) => {
                          const comVal = Number(trip.driverFreight) * (Number(trip.commissionPct) / 100);
                          
                          // Saldo = Frete - Adiantamento - Desconto + Pedágio (Armazenado como tollVoucher)
                          const calculatedBalance = Number(trip.driverFreight) - Number(trip.advance) - Number(trip.discount) + Number(trip.tollVoucher || 0);

                          return (
                            <tr key={trip.id} className="hover:bg-slate-50/50 transition">
                              <td className="py-4 px-6 font-bold text-slate-500 whitespace-nowrap">{formatDate(trip.date)}</td>
                              <td className="py-4 px-4">
                                <span className="font-extrabold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] tracking-wider">{formatPlate(trip.plate)}</span>
                                <div className="text-[10px] text-slate-400 mt-1">NF: {trip.nf} | CTE: {trip.cte}</div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-bold text-slate-800">{getDriverName(trip.driverId)}</div>
                                <div className="text-[10px] text-slate-500 font-medium flex items-center space-x-1 mt-0.5">
                                  <span>{trip.origin}</span>
                                  <span>→</span>
                                  <span>{trip.destination}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">{formatKg(trip.weight)}</td>
                              <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">{formatBRL(trip.driverFreight)}</td>
                              <td className="py-4 px-4">
                                <div className="font-semibold text-amber-600 whitespace-nowrap">-{formatBRL(trip.advance)}</div>
                                {trip.advanceDate ? (
                                  <div className="text-[9px] text-slate-400 mt-0.5 font-medium whitespace-nowrap">Pago: {formatDate(trip.advanceDate)}</div>
                                ) : (
                                  <div className="text-[9px] text-amber-500 font-bold mt-0.5">A pagar</div>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-bold text-indigo-600 whitespace-nowrap">{formatBRL(comVal)}</div>
                                <div className="text-[9px] text-slate-400">({trip.commissionPct}%)</div>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="font-extrabold text-emerald-600 whitespace-nowrap">{formatBRL(calculatedBalance)}</div>
                                <div className="text-[9px] text-slate-400">Pedágio: {formatBRL(trip.tollVoucher)}</div>
                                {trip.balancePaymentDate ? (
                                  <div className="text-[9px] text-emerald-500 font-bold mt-0.5 whitespace-nowrap">Quitado: {formatDate(trip.balancePaymentDate)}</div>
                                ) : (
                                  <div className="text-[9px] text-rose-500 font-extrabold mt-0.5 whitespace-nowrap">Pendente</div>
                                )}
                              </td>
                              <td className="py-4 px-6 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <button onClick={() => handleEditTrip(trip)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                                    <Edit size={14} />
                                  </button>
                                  <button onClick={() => triggerDelete('trip', trip.id, `Viagem NF ${trip.nf}`)} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      {filteredTrips.length === 0 && (
                        <tr>
                          <td colSpan="9" className="py-8 text-center text-slate-400 font-medium">Nenhuma viagem encontrada com o filtro aplicado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {}
          {/* ======================= TAB: DESPESAS FILTRADAS IN REAL ======================= */}
          {currentTab === 'expenses' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Despesas Operacionais</h2>
                  <p className="text-slate-500 text-xs">Registro e controle de manutenção, pneus e custos de frota.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleExportCSV('expenses')}
                    className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition"
                  >
                    <Download size={14} />
                    <span>Exportar CSV</span>
                  </button>
                  <button 
                    onClick={() => {
                      setExpenseForm({ 
                        date: new Date().toISOString().split('T')[0], 
                        description: '', 
                        category: categories.length > 0 ? categories[0].name : 'Outros', 
                        plate: vehicles[0]?.horsePlate || 'Todos', 
                        value: '',
                        dueDate: '',
                        paymentDate: '',
                        installments: '1',
                        cnpj: '',
                        notes: ''
                      });
                      setExpenseModal({ open: true, editingId: null });
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                  >
                    <Plus size={14} />
                    <span>Nova Despesa</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200/85 text-[10px] font-black text-slate-400 tracking-wider uppercase">
                        <th className="py-4 px-6">Data</th>
                        <th className="py-4 px-4">Descrição / Categoria</th>
                        <th className="py-4 px-4">Veículo</th>
                        <th className="py-4 px-4">Valor</th>
                        <th className="py-4 px-6 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                      {filteredExpenses
                        .filter(e => e.description.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((exp) => (
                          <tr key={exp.id} className="hover:bg-slate-50/50 transition">
                            <td className="py-4 px-6 font-bold text-slate-500 whitespace-nowrap">{formatDate(exp.date)}</td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-slate-800">{exp.description}</div>
                              <div className="text-[10px] text-slate-400 mt-1.5 flex flex-wrap gap-2 items-center">
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-slate-100 uppercase text-slate-600">
                                  {exp.category}
                                </span>
                                <span className="text-slate-400">|</span>
                                <span>Parcelas: <strong className="text-slate-700">{exp.installments || 1}x</strong></span>
                                {exp.cnpj && (
                                  <>
                                    <span className="text-slate-400">|</span>
                                    <span>CNPJ: <strong className="text-slate-700 font-mono">{exp.cnpj}</strong></span>
                                  </>
                                )}
                              </div>
                              {exp.notes && (
                                <div className="text-[10px] text-slate-400 mt-1 italic">
                                  Obs: {exp.notes}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-extrabold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] tracking-wider">{formatPlate(exp.plate)}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-black text-rose-600 whitespace-nowrap">{formatBRL(exp.value)}</div>
                              <div className="text-[10px] text-slate-400 mt-1 space-y-0.5">
                                <div>Venc: <strong className="text-slate-600">{formatDate(exp.dueDate) || 'N/A'}</strong></div>
                                <div>Pago: {exp.paymentDate ? (
                                  <strong className="text-emerald-600">{formatDate(exp.paymentDate)}</strong>
                                ) : (
                                  <span className="text-amber-500 font-bold">Pendente</span>
                                )}</div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <button onClick={() => handleEditExpense(exp)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                                  <Edit size={14} />
                                </button>
                                <button onClick={() => triggerDelete('expense', exp.id, exp.description)} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {filteredExpenses.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">Nenhuma despesa localizada com o filtro aplicado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================= TAB: ABASTECIMENTOS ======================= */}
          {currentTab === 'fuels' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Histórico de Abastecimentos</h2>
                  <p className="text-slate-500 text-xs">Monitore litros, tipo de combustível, desconto obtido e dados fiscais (NF e Chave).</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleExportCSV('fuels')}
                    className="flex items-center space-x-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold transition"
                  >
                    <Download size={14} />
                    <span>Exportar CSV</span>
                  </button>
                  <button 
                    onClick={() => {
                      setFuelForm({ 
                        date: new Date().toISOString().split('T')[0], 
                        plate: vehicles[0]?.horsePlate || '', 
                        driverId: drivers[0]?.id || '', 
                        liters: '', 
                        pricePerLiter: '', 
                        odometer: '',
                        invoiceNumber: '', 
                        accessKey: '', 
                        fuelType: 'Diesel S10', 
                        discount: '',
                        hasSecondItem: false,
                        fuelType2: 'Arla 32',
                        liters2: '',
                        pricePerLiter2: '',
                        discount2: '',
                        stationName: '',
                        stationCnpj: ''
                      });
                      setFuelModal({ open: true, editingId: null });
                    }}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                  >
                    <Plus size={14} />
                    <span>Lançar Abastecimento</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200/85 text-[10px] font-black text-slate-400 tracking-wider uppercase">
                        <th className="py-4 px-6">Data</th>
                        <th className="py-4 px-4">Placa Cavalo</th>
                        <th className="py-4 px-4">Motorista</th>
                        <th className="py-4 px-4">Combustíveis Detalhados</th>
                        <th className="py-4 px-4">Posto de Combustível</th>
                        <th className="py-4 px-4">NF / Chave de Acesso</th>
                        <th className="py-4 px-4 text-right">Descontos Totais</th>
                        <th className="py-4 px-4 text-right">Custo Líquido</th>
                        <th className="py-4 px-6 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredFuels
                        .filter(f => 
                          getDriverName(f.driverId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.fuelType && f.fuelType.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (f.invoiceNumber && f.invoiceNumber.includes(searchTerm)) ||
                          (f.stationName && f.stationName.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                        .map((fuel) => {
                          const mainCost = (Number(fuel.liters) * Number(fuel.pricePerLiter)) - Number(fuel.discount || 0);
                          const secondCost = fuel.hasSecondItem 
                            ? (Number(fuel.liters2) * Number(fuel.pricePerLiter2)) - Number(fuel.discount2 || 0)
                            : 0;
                          const totalCost = mainCost + secondCost;
                          const totalDiscount = Number(fuel.discount || 0) + (fuel.hasSecondItem ? Number(fuel.discount2 || 0) : 0);

                          return (
                            <tr key={fuel.id} className="hover:bg-slate-50/50 transition">
                              <td className="py-4 px-6 font-bold text-slate-500 whitespace-nowrap">{formatDate(fuel.date)}</td>
                              <td className="py-4 px-4"><span className="font-extrabold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] tracking-wider">{formatPlate(fuel.plate)}</span></td>
                              <td className="py-4 px-4 font-bold text-slate-800">{getDriverName(fuel.driverId)}</td>
                              <td className="py-4 px-4">
                                <div className="space-y-1">
                                  <div className="font-bold text-slate-700">
                                    {fuel.fuelType}: <span className="text-indigo-600 font-extrabold">{fuel.liters} L</span> <span className="text-slate-400 font-normal">({formatBRL(fuel.pricePerLiter)}/L)</span>
                                  </div>
                                  {fuel.hasSecondItem && (
                                    <div className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block text-[10px]">
                                      {fuel.fuelType2}: <span className="font-extrabold">{fuel.liters2} L</span> <span className="text-slate-400 font-normal">({formatBRL(fuel.pricePerLiter2)}/L)</span>
                                    </div>
                                  )}
                                  <div className="text-[10px] text-slate-400">Odômetro: {new Intl.NumberFormat('pt-BR').format(fuel.odometer)} KM</div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-bold text-slate-700 truncate max-w-[150px]" title={fuel.stationName}>
                                  {fuel.stationName || 'Não Informado'}
                                </div>
                                <div className="text-[9px] font-mono text-slate-400">
                                  {fuel.stationCnpj || 'Sem CNPJ'}
                                </div>
                              </td>
                              <td className="py-4 px-4 max-w-[200px]">
                                <div className="font-bold text-slate-700">NF: {fuel.invoiceNumber || 'Não informada'}</div>
                                <div className="text-[9px] text-slate-400 truncate" title={fuel.accessKey}>
                                  {fuel.accessKey || 'Sem chave de acesso'}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-rose-500 whitespace-nowrap">
                                {totalDiscount > 0 ? `-${formatBRL(totalDiscount)}` : 'R$ 0,00'}
                              </td>
                              <td className="py-4 px-4 text-right font-black text-amber-600 whitespace-nowrap">
                                {formatBRL(totalCost)}
                              </td>
                              <td className="py-4 px-6 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <button onClick={() => handleEditFuel(fuel)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                                    <Edit size={14} />
                                  </button>
                                  <button onClick={() => triggerDelete('fuel', fuel.id, `Abastecimento NF ${fuel.invoiceNumber}`)} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      {filteredFuels.length === 0 && (
                        <tr>
                          <td colSpan="9" className="py-8 text-center text-slate-400 font-medium">Nenhum registro de abastecimento encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================= TAB: MOTORISTAS ======================= */}
          {currentTab === 'drivers' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Ficha de Motoristas</h2>
                  <p className="text-slate-500 text-xs">Registro de profissionais, habilitações e dados de contato.</p>
                </div>
                <button 
                  onClick={() => {
                    setDriverForm({ name: '', cpf: '', email: '', phone: '' });
                    setDriverModal({ open: true, editingId: null });
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                >
                  <Plus size={14} />
                  <span>Cadastrar Novo Motorista</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers
                  .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.cpf.includes(searchTerm))
                  .map((driver) => (
                    <div key={driver.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                            <User size={18} className="stroke-[2.5]" />
                          </div>
                          <div className="flex items-center space-x-1">
                            <button onClick={() => handleEditDriver(driver)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                              <Edit size={14} />
                            </button>
                            <button onClick={() => triggerDelete('driver', driver.id, driver.name)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-slate-800 text-base">{driver.name}</h3>
                          <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-0.5">CPF: {driver.cpf}</p>
                        </div>

                        <div className="space-y-1.5 border-t border-slate-50 pt-3 text-xs text-slate-500 font-medium">
                          <p className="flex items-center space-x-2">
                            <span className="text-slate-400">✉</span>
                            <span className="truncate">{driver.email}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <span className="text-slate-400">📞</span>
                            <span>{driver.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}


          {/* ======================= TAB: VEÍCULOS ======================= */}
          {currentTab === 'vehicles' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Registro de Veículos</h2>
                  <p className="text-slate-500 text-xs">Configure o conjunto ativo (Placa do Cavalo + Placa da Carreta).</p>
                </div>
                <button 
                  onClick={() => {
                    setVehicleForm({ horsePlate: '', trailerPlate: '', brandModel: '', status: 'Ativo' });
                    setVehicleModal({ open: true, editingId: null });
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                >
                  <Plus size={14} />
                  <span>Cadastrar Veículo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles
                  .filter(v => v.horsePlate.toLowerCase().includes(searchTerm.toLowerCase()) || v.brandModel.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((vehicle) => (
                    <div key={vehicle.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${vehicle.status === 'Ativo' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{vehicle.status}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button onClick={() => handleEditVehicle(vehicle)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => triggerDelete('vehicle', vehicle.id, `Conjunto Placa ${vehicle.horsePlate}`)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{vehicle.brandModel}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Conjunto de Carga Pesada</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Placa Cavalo</p>
                          <p className="text-sm font-black text-slate-700 tracking-wide mt-1">{formatPlate(vehicle.horsePlate)}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Placa Carreta</p>
                          <p className="text-sm font-black text-slate-700 tracking-wide mt-1">{formatPlate(vehicle.trailerPlate)}</p>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ======================= TAB: CATEGORIAS ======================= */}
          {currentTab === 'categories' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Categorias de Despesas</h2>
                  <p className="text-slate-500 text-xs">Gerencie as categorias utilizadas para classificar suas despesas operacionais.</p>
                </div>
                <button 
                  onClick={() => {
                    setCategoryForm({ name: '' });
                    setCategoryModal({ open: true, editingId: null });
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold shadow-sm transition"
                >
                  <Plus size={14} />
                  <span>Nova Categoria</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories
                  .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((category) => (
                    <div key={category.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <Layers size={16} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm">{category.name}</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleEditCategory(category)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => triggerDelete('category', category.id, category.name)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                {categories.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-400 font-medium">Nenhuma categoria encontrada.</div>
                )}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* ======================= MODAL PERSONALIZADO DE EXCLUSÃO ======================= */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center space-x-3 text-rose-600">
              <AlertCircle size={24} className="shrink-0" />
              <h3 className="text-base font-extrabold text-slate-800">Confirmar Exclusão</h3>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">
              Tem certeza que deseja excluir o registro <strong className="text-slate-800">"{deleteConfirm.title}"</strong>? Esta ação é irreversível.
            </p>

            <div className="flex justify-end space-x-3 pt-2">
              <button 
                type="button" 
                onClick={() => setDeleteConfirm({ open: false, type: '', id: null, title: '' })}
                className="px-3.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-bold"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={executeDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Excluir Registro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: VIAGENS / RECEITAS ======================= */}
      {tripModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {tripModal.editingId ? 'Editar Viagem (Receita)' : 'Cadastrar Nova Viagem'}
              </h3>
              <button 
                onClick={() => setTripModal({ open: false, editingId: null })}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTrip} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Data da Viagem</label>
                  <input required type="date" value={tripForm.date} onChange={(e) => setTripForm({...tripForm, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Vincular Cavalo (Placa)</label>
                  <select required value={tripForm.plate} onChange={(e) => setTripForm({...tripForm, plate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600">
                    <option value="">Selecione...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.horsePlate}>{v.horsePlate}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Motorista Atribuído</label>
                  <select required value={tripForm.driverId} onChange={(e) => setTripForm({...tripForm, driverId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600">
                    <option value="">Selecione...</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Nº Nota Fiscal (NF)</label>
                  <input required type="text" placeholder="Ex: 95481" value={tripForm.nf} onChange={(e) => setTripForm({...tripForm, nf: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Nº Conhecimento (CT-e)</label>
                  <input required type="text" placeholder="Ex: 22104" value={tripForm.cte} onChange={(e) => setTripForm({...tripForm, cte: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Transportadora / Cliente</label>
                  <input required type="text" placeholder="Razão Social" value={tripForm.carrier} onChange={(e) => setTripForm({...tripForm, carrier: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Origem</label>
                  <input required type="text" placeholder="Cidade-UF" value={tripForm.origin} onChange={(e) => setTripForm({...tripForm, origin: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Destino</label>
                  <input required type="text" placeholder="Cidade-UF" value={tripForm.destination} onChange={(e) => setTripForm({...tripForm, destination: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Carga Útil (kg)</label>
                  <input required type="number" placeholder="Ex: 32000" value={tripForm.weight} onChange={(e) => setTripForm({...tripForm, weight: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
              </div>

              {/* CONTROLE FINANCEIRO */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">Composição Financeira</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block mb-1.5 text-slate-500">Valor do Frete (R$)</label>
                    <input required type="number" step="0.01" placeholder="Ex: 12500" value={tripForm.driverFreight} onChange={(e) => setTripForm({...tripForm, driverFreight: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none font-bold text-slate-800" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Adiantamento (R$)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={tripForm.advance} onChange={(e) => setTripForm({...tripForm, advance: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none text-slate-700" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Pedágio (R$)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={tripForm.tollVoucher} onChange={(e) => setTripForm({...tripForm, tollVoucher: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none text-slate-700" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Descontos (R$)</label>
                    <input type="number" step="0.01" placeholder="0.00" value={tripForm.discount} onChange={(e) => setTripForm({...tripForm, discount: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none text-slate-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/50 pt-3">
                  <div>
                    <label className="block mb-1.5 text-slate-500">Saldo (R$)</label>
                    {(() => {
                      const calculated = (Number(tripForm.driverFreight) || 0) - (Number(tripForm.advance) || 0) - (Number(tripForm.discount) || 0) + (Number(tripForm.tollVoucher) || 0);
                      return (
                        <input 
                          readOnly 
                          type="text" 
                          value={formatBRL(calculated)} 
                          className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 outline-none font-black text-slate-700 cursor-not-allowed" 
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Data Pgto Adiantamento</label>
                    <input type="date" value={tripForm.advanceDate} onChange={(e) => setTripForm({...tripForm, advanceDate: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Data Pgto Saldo</label>
                    <input type="date" value={tripForm.balancePaymentDate} onChange={(e) => setTripForm({...tripForm, balancePaymentDate: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/50 pt-3">
                  <div>
                    <label className="block mb-1.5 text-slate-500">Taxa de Comissão (%)</label>
                    <input type="number" placeholder="10" value={tripForm.commissionPct} onChange={(e) => setTripForm({...tripForm, commissionPct: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 outline-none font-bold" />
                  </div>
                  <div className="flex flex-col justify-end text-right">
                    <p className="text-[10px] text-slate-400">Comissão do Motorista:</p>
                    <p className="text-base font-extrabold text-indigo-600 mt-1">
                      {formatBRL((Number(tripForm.driverFreight) || 0) * ((Number(tripForm.commissionPct) || 0) / 100))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setTripModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Confirmar Viagem</button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ======================= MODAL: DESPESAS ======================= */}
      {expenseModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-xl w-full p-6 space-y-6 max-h-[95vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {expenseModal.editingId ? 'Editar Despesa' : 'Registrar Nova Despesa'}
              </h3>
              <button onClick={() => setExpenseModal({ open: false, editingId: null })} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Descrição / Motivo</label>
                  <input required type="text" placeholder="Ex: Substituição das Pastilhas de Freio" value={expenseForm.description} onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">CNPJ do Fornecedor</label>
                  <input type="text" placeholder="Ex: 00.000.000/0000-00" value={expenseForm.cnpj} onChange={(e) => setExpenseForm({...expenseForm, cnpj: maskCnpj(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Categoria</label>
                  <select required value={expenseForm.category} onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Veículo Vinculado</label>
                  <select required value={expenseForm.plate} onChange={(e) => setExpenseForm({...expenseForm, plate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                    <option value="Todos">Despesa Geral da Frota</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.horsePlate}>{v.horsePlate}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Quantidade de Parcelas</label>
                  <input required type="number" min="1" placeholder="Ex: 1" value={expenseForm.installments} onChange={(e) => setExpenseForm({...expenseForm, installments: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Data do Lançamento</label>
                  <input required type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Data de Vencimento</label>
                  <input required type="date" value={expenseForm.dueDate} onChange={(e) => setExpenseForm({...expenseForm, dueDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Data de Pagamento</label>
                  <input type="date" value={expenseForm.paymentDate} onChange={(e) => setExpenseForm({...expenseForm, paymentDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block mb-1.5 text-slate-500">Valor Total da Despesa (R$)</label>
                  <input required type="number" step="0.01" placeholder="Ex: 150.00" value={expenseForm.value} onChange={(e) => setExpenseForm({...expenseForm, value: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-slate-800 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1.5 text-slate-500">Observações / Detalhes</label>
                  <input type="text" placeholder="Ex: Dividido s/ juros no boleto" value={expenseForm.notes} onChange={(e) => setExpenseForm({...expenseForm, notes: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setExpenseModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Salvar Despesa</button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ======================= MODAL: ABASTECIMENTOS COMPOSIÇÃO MULTIPLA ======================= */}
      {fuelModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-xl w-full p-6 space-y-6 max-h-[95vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {fuelModal.editingId ? 'Editar Lançamento de Abastecimento' : 'Registrar Novo Abastecimento'}
              </h3>
              <button onClick={() => setFuelModal({ open: false, editingId: null })} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveFuel} className="space-y-4 text-xs font-semibold text-slate-600">
              
              {/* DADOS GERAIS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Data do Abastecimento</label>
                  <input required type="date" value={fuelForm.date} onChange={(e) => setFuelForm({...fuelForm, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Placa do Cavalo Atribuído</label>
                  <select required value={fuelForm.plate} onChange={(e) => setFuelForm({...fuelForm, plate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                    <option value="">Selecione...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.horsePlate}>{v.horsePlate}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Motorista Executor</label>
                  <select required value={fuelForm.driverId} onChange={(e) => setFuelForm({...fuelForm, driverId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                    <option value="">Selecione...</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Odômetro Atual (KM)</label>
                  <input required type="number" placeholder="Ex: 125000" value={fuelForm.odometer} onChange={(e) => setFuelForm({...fuelForm, odometer: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-mono" />
                </div>
              </div>

              {/* IDENTIFICAÇÃO DO POSTO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider col-span-1 sm:col-span-2">Posto Emissor</p>
                <div>
                  <label className="block mb-1.5 text-slate-500">Nome Fantasia do Posto</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Posto Graal Petropen" 
                    value={fuelForm.stationName} 
                    onChange={(e) => setFuelForm({...fuelForm, stationName: e.target.value})} 
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-semibold" 
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">CNPJ do Posto</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 00.000.000/0000-00" 
                    value={fuelForm.stationCnpj} 
                    onChange={(e) => setFuelForm({...fuelForm, stationCnpj: maskCnpj(e.target.value)})} 
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-mono font-semibold" 
                  />
                </div>
              </div>

              {/* ITEM principal de combustivel */}
              <div className="border border-indigo-100 bg-indigo-50/15 p-4 rounded-xl space-y-3">
                <p className="text-xs font-bold text-indigo-700 tracking-wider uppercase mb-1">Combustível / Item Principal</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block mb-1.5 text-slate-500">Tipo do Item</label>
                    <select required value={fuelForm.fuelType} onChange={(e) => setFuelForm({...fuelForm, fuelType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                      <option value="Diesel S10">Diesel S10</option>
                      <option value="Diesel S500">Diesel S500</option>
                      <option value="Gasolina Comum">Gasolina Comum</option>
                      <option value="Gasolina Aditivada">Gasolina Aditivada</option>
                      <option value="Etanol">Etanol</option>
                      <option value="Arla 32">Arla 32</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Litros</label>
                    <input required type="number" step="any" placeholder="Ex: 350" value={fuelForm.liters} onChange={(e) => setFuelForm({...fuelForm, liters: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-slate-800" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-slate-500">Preço p/ Litro (R$)</label>
                    <input required type="number" step="0.001" placeholder="Ex: 5.85" value={fuelForm.pricePerLiter} onChange={(e) => setFuelForm({...fuelForm, pricePerLiter: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-slate-800" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Desconto neste item (R$)</label>
                  <input type="number" step="0.01" placeholder="Ex: 15.00" value={fuelForm.discount} onChange={(e) => setFuelForm({...fuelForm, discount: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:bg-white outline-none text-rose-600 font-bold" />
                </div>
              </div>

              {/* OPÇÃO DE MULTIPLOS COMBUSTIVEIS (SEGUNDO ITEM) */}
              <div className="border border-slate-200 p-4 rounded-xl space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="hasSecondItem" 
                      checked={fuelForm.hasSecondItem} 
                      onChange={(e) => setFuelForm({...fuelForm, hasSecondItem: e.target.checked})} 
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" 
                    />
                    <label htmlFor="hasSecondItem" className="text-xs font-extrabold text-slate-700 cursor-pointer select-none">
                      Acrescentar outro combustível / aditivo (Ex: Arla 32)
                    </label>
                  </div>
                </div>

                {fuelForm.hasSecondItem && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 animate-fadeIn">
                    <div className="sm:col-span-2">
                      <label className="block mb-1.5 text-slate-500">Combustível 2</label>
                      <select required={fuelForm.hasSecondItem} value={fuelForm.fuelType2} onChange={(e) => setFuelForm({...fuelForm, fuelType2: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none">
                        <option value="Arla 32">Arla 32</option>
                        <option value="Diesel S10">Diesel S10</option>
                        <option value="Diesel S500">Diesel S500</option>
                        <option value="Gasolina Comum">Gasolina Comum</option>
                        <option value="Etanol">Etanol</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1.5 text-slate-500">Litros 2</label>
                      <input required={fuelForm.hasSecondItem} type="number" step="any" placeholder="Ex: 50" value={fuelForm.liters2} onChange={(e) => setFuelForm({...fuelForm, liters2: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none font-bold" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-slate-500">Preço Litro 2</label>
                      <input required={fuelForm.hasSecondItem} type="number" step="0.001" placeholder="Ex: 3.20" value={fuelForm.pricePerLiter2} onChange={(e) => setFuelForm({...fuelForm, pricePerLiter2: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none font-bold" />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block mb-1.5 text-slate-500">Desconto item 2 (R$)</label>
                      <input type="number" step="0.01" placeholder="0.00" value={fuelForm.discount2} onChange={(e) => setFuelForm({...fuelForm, discount2: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none text-rose-600 font-bold" />
                    </div>
                  </div>
                )}
              </div>

              {/* DADOS DE NOTA FISCAL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Número da Nota Fiscal (NF)</label>
                  <input required type="text" placeholder="Ex: 11054" value={fuelForm.invoiceNumber} onChange={(e) => setFuelForm({...fuelForm, invoiceNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Chave de Acesso da NFe (44 dígitos)</label>
                  <input 
                    type="text" 
                    maxLength={44} 
                    placeholder="Chave fiscal sem espaços" 
                    value={fuelForm.accessKey} 
                    onChange={(e) => setFuelForm({...fuelForm, accessKey: e.target.value.replace(/\D/g, '')})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-mono text-xs text-slate-600 tracking-wider" 
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Faltam {44 - (fuelForm.accessKey ? fuelForm.accessKey.length : 0)} dígitos.</span>
                </div>
              </div>

              {/* CUSTO LÍQUIDO GERAL ESTIMADO */}
              {(() => {
                const item1Cost = Math.max(0, ((Number(fuelForm.liters) || 0) * (Number(fuelForm.pricePerLiter) || 0)) - (Number(fuelForm.discount) || 0));
                const item2Cost = fuelForm.hasSecondItem 
                  ? Math.max(0, ((Number(fuelForm.liters2) || 0) * (Number(fuelForm.pricePerLiter2) || 0)) - (Number(fuelForm.discount2) || 0))
                  : 0;
                return (
                  <div className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center text-indigo-700">
                    <span className="font-semibold">Custo Geral Líquido (Item 1 + Item 2):</span>
                    <span className="font-extrabold text-sm">{formatBRL(item1Cost + item2Cost)}</span>
                  </div>
                );
              })()}

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setFuelModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Salvar Registro</button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ======================= MODAL: MOTORISTAS ======================= */}
      {driverModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-md w-full p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {driverModal.editingId ? 'Editar Registro de Motorista' : 'Adicionar Motorista'}
              </h3>
              <button onClick={() => setDriverModal({ open: false, editingId: null })} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div>
                <label className="block mb-1.5 text-slate-500">Nome Completo</label>
                <input required type="text" placeholder="Nome do Motorista" value={driverForm.name} onChange={(e) => setDriverForm({...driverForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">CPF</label>
                <input required type="text" placeholder="Ex: 000.000.000-00" value={driverForm.cpf} onChange={(e) => setDriverForm({...driverForm, cpf: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Endereço de E-mail</label>
                <input required type="email" placeholder="motorista@exemplo.com.br" value={driverForm.email} onChange={(e) => setDriverForm({...driverForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Telefone para Contato</label>
                <input required type="text" placeholder="Ex: (11) 99999-9999" value={driverForm.phone} onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setDriverModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Salvar Motorista</button>
              </div>

            </form>

          </div>
        </div>
      )}


      {/* ======================= MODAL: VEÍCULOS ======================= */}
      {vehicleModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-md w-full p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {vehicleModal.editingId ? 'Editar Equipamento' : 'Configurar Equipamento'}
              </h3>
              <button onClick={() => setVehicleModal({ open: false, editingId: null })} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-slate-500">Placa Cavalo</label>
                  <input required type="text" placeholder="ABC-1234" value={vehicleForm.horsePlate} onChange={(e) => setVehicleForm({...vehicleForm, horsePlate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-center" />
                </div>
                <div>
                  <label className="block mb-1.5 text-slate-500">Placa Carreta</label>
                  <input required type="text" placeholder="XYZ-5678" value={vehicleForm.trailerPlate} onChange={(e) => setVehicleForm({...vehicleForm, trailerPlate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none font-bold text-center" />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Marca / Modelo do Cavalo Trator</label>
                <input required type="text" placeholder="Ex: Scania R450 Streamline" value={vehicleForm.brandModel} onChange={(e) => setVehicleForm({...vehicleForm, brandModel: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div>
                <label className="block mb-1.5 text-slate-500">Status Operacional</label>
                <select value={vehicleForm.status} onChange={(e) => setVehicleForm({...vehicleForm, status: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none">
                  <option value="Ativo">Ativo / Em Circulação</option>
                  <option value="Em Manutenção">Em Manutenção / Oficina</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setVehicleModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Salvar Configuração</button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ======================= MODAL: CATEGORIAS ======================= */}
      {categoryModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-sm w-full p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-extrabold text-slate-800">
                {categoryModal.editingId ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              <button onClick={() => setCategoryModal({ open: false, editingId: null })} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-semibold text-slate-600">
              
              <div>
                <label className="block mb-1.5 text-slate-500">Nome da Categoria</label>
                <input required type="text" placeholder="Ex: Estacionamento" value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white outline-none" />
              </div>

              <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setCategoryModal({ open: false, editingId: null })} className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-bold shadow-sm">Salvar</button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}