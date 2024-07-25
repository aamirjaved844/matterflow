from setuptools import setup

setup(name='MATTERFLOWCLI',
      version='0.0.0',
      py_modules= ['matterflowcli'],
      install_requires=[
            'Click',
      ],
      entry_points='''
            [console_scripts]
            matterflow=matterflowcli:event
      ''',
      description='CLI application for matterflow virtual programming tool',
      author='Team',
      license='MIT',
      zip_safe=False)