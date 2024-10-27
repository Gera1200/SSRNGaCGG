import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class CalculadoraAntiguedad {

    // Lista para almacenar los registros de cada empleado
    private List<Empleado> registros;

    public CalculadoraAntiguedad() {
        registros = new ArrayList<>();
    }

    // Método para agregar un registro de empleado
    public void agregarRegistro(String clave, LocalDate fechaIngreso, LocalDate fechaEgreso, int tipo) {
        registros.add(new Empleado(clave, fechaIngreso, fechaEgreso, tipo));
    }

    // Método para eliminar un registro por índice
    public void eliminarRegistro(int indice) {
        if (indice >= 0 && indice < registros.size()) {
            registros.remove(indice);
        }
    }

    // Método para calcular el tiempo total en activo y en licencia
    public ResultadoCalculo calcularTiempoTotal() {
        Period tiempoActivo = Period.ZERO;
        Period tiempoLicencia = Period.ZERO;

        for (Empleado registro : registros) {
            Period tiempo = Period.between(registro.getFechaIngreso(), registro.getFechaEgreso());

            // Si el tipo es Activo (1), sumamos al tiempo activo, si es Licencia (2), sumamos al tiempo de licencia
            if (registro.getTipo() == 1) {
                tiempoActivo = tiempoActivo.plus(tiempo);
            } else if (registro.getTipo() == 2) {
                tiempoLicencia = tiempoLicencia.plus(tiempo);
            }
        }

        return new ResultadoCalculo(tiempoActivo, tiempoLicencia);
    }

    public static void main(String[] args) {
        CalculadoraAntiguedad calculadora = new CalculadoraAntiguedad();

        // Ejemplo de uso
        calculadora.agregarRegistro("123456", LocalDate.of(2023, 1, 1), LocalDate.of(2023, 12, 31), 1);
        calculadora.agregarRegistro("789012", LocalDate.of(2024, 1, 1), LocalDate.of(2024, 6, 30), 1);
        calculadora.agregarRegistro("345678", LocalDate.of(2024, 7, 1), LocalDate.of(2024, 12, 31), 2);
        calculadora.agregarRegistro("901234", LocalDate.of(2025, 1, 1), LocalDate.of(2025, 3, 1), 1);

        ResultadoCalculo resultado = calculadora.calcularTiempoTotal();
        System.out.println("Tiempo Activo Total: " + resultado.getTiempoActivo().getYears() + " años, "
                + resultado.getTiempoActivo().getMonths() + " meses, " + resultado.getTiempoActivo().getDays() + " días");
        System.out.println("Tiempo en Licencia Total: " + resultado.getTiempoLicencia().getYears() + " años, "
                + resultado.getTiempoLicencia().getMonths() + " meses, " + resultado.getTiempoLicencia().getDays() + " días");
    }
}

// Clase para representar cada registro de un empleado
class Empleado {
    private String clave;
    private LocalDate fechaIngreso;
    private LocalDate fechaEgreso;
    private int tipo; // 1 para Activo, 2 para Licencia

    public Empleado(String clave, LocalDate fechaIngreso, LocalDate fechaEgreso, int tipo) {
        this.clave = clave;
        this.fechaIngreso = fechaIngreso;
        this.fechaEgreso = fechaEgreso;
        this.tipo = tipo;
    }

    public String getClave() {
        return clave;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public LocalDate getFechaEgreso() {
        return fechaEgreso;
    }

    public int getTipo() {
        return tipo;
    }
}

// Clase para almacenar el resultado de los cálculos
class ResultadoCalculo {
    private Period tiempoActivo;
    private Period tiempoLicencia;

    public ResultadoCalculo(Period tiempoActivo, Period tiempoLicencia) {
        this.tiempoActivo = tiempoActivo;
        this.tiempoLicencia = tiempoLicencia;
    }

    public Period getTiempoActivo() {
        return tiempoActivo;
    }

    public Period getTiempoLicencia() {
        return tiempoLicencia;
    }
}
