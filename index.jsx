const Row = ({ name, lastname, age, sex}) => (
    <div className="row">
      <p>_ _ _ _ _ _ _ _ _ _ _ _ _</p>
      <p>{name} {lastname}</p>
      <p>Возраст: {age}</p>
      <p>Пол: {sex === 'm'? 'мужской': 'женский'}</p> 
    </div>
  );

  class Table extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
        error: null,
        data: []
      };
      
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleAgeChange = this.handleAgeChange.bind(this);
      this.checkBoxMaleChange = this.checkBoxMaleChange.bind(this);
      this.checkBoxFemaleChange = this.checkBoxFemaleChange.bind(this);

    }

    componentDidMount() {
        fetch("https://venbest-test.herokuapp.com/")
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
                data: [...result],
                originalData: [...result],
                name: '',
                lastname: '',
                age: '',
                male: false,
                female: false
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    
    filterBy(){
        var arrayResult = [...this.state.originalData];

        var name = this.state.name;
        if(name != null && name !== ''){
          arrayResult = arrayResult.filter(p => p.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
        }

        var lastname = this.state.lastname;
        if(lastname != null && lastname !== ''){
          arrayResult = arrayResult.filter(p => p.lastname.toLowerCase().indexOf(lastname.toLowerCase()) >= 0);
        }

        var age = this.state.age;
        if(age != null && age !== ''){
          arrayResult = arrayResult.filter(p => p.age == age);
        }

        if(this.state.male === true && this.state.female == false){
          var male = 'm';
          arrayResult = arrayResult.filter(p => p.sex === male);
        }

        if(this.state.male == false && this.state.female === true){
          var female = 'f';
          arrayResult = arrayResult.filter(p => p.sex === female);
        }
        
        this.setState({data: arrayResult});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value}, function () {
          this.filterBy();
      });
    }
    handleLastNameChange(e) {
        this.setState({lastname: e.target.value}, function () {
          this.filterBy();
      });
    }
    handleAgeChange(e) {
        this.setState({age: e.target.value}, function () {
          this.filterBy();
      });
    }

    checkBoxMaleChange(e){
        this.setState({male: e.target.checked}, function () {
          this.filterBy();
      });
    }
    checkBoxFemaleChange(e){
        this.setState({female: e.target.checked}, function () {
          this.filterBy();
      });
    }
      
    render() {
      const rows = this.state.data.map( (rowData) => {
          var a = <Row {...rowData} />;
          return a;
    });

    return (
        <div className="table">
          <div className="header">
              <form>
                    <label>Имя:</label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleNameChange} />
                    <p>
                      <label>Фамилия:</label>
                      <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleLastNameChange} /></p>
                    <p>
                      <label>Возраст:</label>
                      <input type="text" name="age" value={this.state.age} onChange={this.handleAgeChange} /></p>
                    <p>
                        <label>Пол:</label>
                        <input type="checkbox" id="male" name="male" checked={this.state.male} onChange={this.checkBoxMaleChange} />
                        <label for="male">М</label>
                        <input type="checkbox" id="female" name="female" checked={this.state.female} onChange={this.checkBoxFemaleChange} />
                        <label for="female">Ж</label>
                    </p>
              </form>
          </div>
          <div className="body">
            {rows}
          </div>
        </div>
      );
      
    }
  }
  
  ReactDOM.render(<Table />, document.getElementById('app'));