"use client";

import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    if (!gl) {
      console.warn("WebGL2 not supported");
      return;
    }

    // -------------------- Shader source --------------------
    const vertexShaderSource = `
        precision highp float;
        attribute vec2 aPosition;
        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision highp float;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uTime;
        
        // Noise function
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
            vec2 st = gl_FragCoord.xy / uResolution;
            vec2 center = vec2(0.5, 0.5);
            
            // Multiple layers of movement
            float t = uTime * 0.1;
            vec2 p1 = st + vec2(sin(t), cos(t)) * 0.3;
            vec2 p2 = st + vec2(cos(t * 0.7), sin(t * 0.5)) * 0.2;
            
            // Create flowing waves
            float n1 = noise(p1 * 3.0 + uTime * 0.2);
            float n2 = noise(p2 * 4.0 - uTime * 0.15);
            float n3 = noise(st * 5.0 + uTime * 0.1);
            
            // Mouse interaction
            float mouseInfluence = 1.0 - distance(st, uMouse) * 1.5;
            mouseInfluence = max(0.0, mouseInfluence);
            
            // Combine noise layers
            float pattern = (n1 + n2 * 0.5 + n3 * 0.3) / 1.8;
            pattern += mouseInfluence * 0.4;
            
            // Create gradient effect
            float gradient = 1.0 - length(st - center) * 1.2;
            
            // Deep blue to cyan to light blue gradient
            vec3 color1 = vec3(0.1, 0.2, 0.5); // Deep blue
            vec3 color2 = vec3(0.0, 0.5, 0.8); // Cyan
            vec3 color3 = vec3(0.3, 0.7, 1.0); // Light blue
            
            vec3 finalColor = mix(color1, color2, pattern);
            finalColor = mix(finalColor, color3, n2);
            finalColor *= gradient * 0.6;
            finalColor += mouseInfluence * vec3(0.3, 0.1, 0.5);
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    // -------------------- Shader compile functions --------------------
    function createShader(
      gl: WebGL2RenderingContext,
      type: number,
      source: string,
    ): WebGLShader {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
      }
      return shader;
    }

    function createProgram(
      gl: WebGL2RenderingContext,
      vsSource: string,
      fsSource: string,
    ): WebGLProgram {
      const program = gl.createProgram()!;
      gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
      gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
      }
      return program;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    // -------------------- Buffer --------------------
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // -------------------- Uniforms --------------------
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uTime = gl.getUniformLocation(program, "uTime");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / canvas.width;
      mouseY = 1.0 - e.clientY / canvas.height;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // -------------------- Render loop --------------------
    function render() {
      time += 0.016;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uTime, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ background: "transparent" }}
    />
  );
}
